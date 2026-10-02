'use client';

import React, { useEffect, useRef } from 'react';

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export const BackgroundCursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth interpolation (lerp)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHoveringBg: false,
      lastMoveTime: 0,
    };

    const waves: Wave[] = [];
    let lastWaveTime = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHoveringBg = true;
      mouse.lastMoveTime = performance.now();

      // Spawn signal waves on background movement every ~140ms
      const now = performance.now();
      if (now - lastWaveTime > 140) {
        waves.push({
          x: e.clientX,
          y: e.clientY,
          radius: 6,
          maxRadius: 75,
          opacity: 0.35,
          speed: 1.2,
        });
        lastWaveTime = now;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Impact broadcast ripple on background click
      for (let i = 0; i < 2; i++) {
        waves.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10 + i * 15,
          maxRadius: 130 + i * 30,
          opacity: 0.5,
          speed: 2.2 + i * 0.5,
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.isHoveringBg = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse towards target
      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;

      const isRecent = performance.now() - mouse.lastMoveTime < 3500;

      if (mouse.isHoveringBg && isRecent) {
        // 1. Digital news spotlight glow centered on cursor
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        gradient.addColorStop(0, 'rgba(0, 159, 227, 0.13)');
        gradient.addColorStop(0.4, 'rgba(0, 159, 227, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 159, 227, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 260, 0, Math.PI * 2);
        ctx.fill();

        // 2. Subtle editorial coordinates / crosshair around the cursor
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 159, 227, 0.28)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);

        const tickDist = 18;
        const tickLen = 9;
        
        // North
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y - tickDist);
        ctx.lineTo(mouse.x, mouse.y - tickDist - tickLen);
        ctx.stroke();

        // South
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y + tickDist);
        ctx.lineTo(mouse.x, mouse.y + tickDist + tickLen);
        ctx.stroke();

        // West
        ctx.beginPath();
        ctx.moveTo(mouse.x - tickDist, mouse.y);
        ctx.lineTo(mouse.x - tickDist - tickLen, mouse.y);
        ctx.stroke();

        // East
        ctx.beginPath();
        ctx.moveTo(mouse.x + tickDist, mouse.y);
        ctx.lineTo(mouse.x + tickDist - tickLen, mouse.y);
        ctx.stroke();

        // Center beacon dot
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(0, 159, 227, 0.7)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Subtle outer pulse ring
        ctx.strokeStyle = 'rgba(0, 159, 227, 0.2)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // 3. Render expanding broadcast signal waves
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += wave.speed;
        wave.opacity *= 0.965;

        ctx.save();
        ctx.strokeStyle = `rgba(0, 159, 227, ${wave.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (wave.opacity <= 0.01 || wave.radius >= wave.maxRadius) {
          waves.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
