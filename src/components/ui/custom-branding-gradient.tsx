"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DIcons } from "dicons";

type ColorStop = {
  color: string;
  position: number;
};

const defaultColorStops: ColorStop[] = [
  { color: "#00e1ff", position: 0 },
  { color: "#0000ff", position: 100 },
];

export function CustomBrandingGradient() {
  const [colorStops, setColorStops] = useState<ColorStop[]>(defaultColorStops);
  const [angle, setAngle] = useState(90);
  const [noiseAmount, setNoiseAmount] = useState(0);
  const [applyNoise, setApplyNoise] = useState(false);
  const [isRadialGradient, setIsRadialGradient] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const gradientString = colorStops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  const gradientStyle = {
    background: !isRadialGradient
      ? `linear-gradient(${angle}deg, ${gradientString})`
      : `radial-gradient(circle, ${gradientString})`,
  };

  useEffect(() => {
    updateCanvas();
  }, [colorStops, angle, noiseAmount, applyNoise, isRadialGradient]);

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (canvas && displayCanvas) {
      const ctx = canvas.getContext("2d");
      const displayCtx = displayCanvas.getContext("2d");
      if (ctx && displayCtx) {
        let gradient;
        if (!isRadialGradient) {
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        } else {
          gradient = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
          );
        }

        colorStops.forEach((stop) => {
          gradient.addColorStop(stop.position / 100, stop.color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (applyNoise) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * noiseAmount;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
          }
          ctx.putImageData(imageData, 0, 0);
        }

        displayCtx.drawImage(canvas, 0, 0, displayCanvas.width, displayCanvas.height);
      }
    }
  };

  const addColorStop = () => {
    if (colorStops.length < 5) {
      const newPosition = Math.round(
        (colorStops[colorStops.length - 1].position + colorStops[0].position) / 2
      );
      setColorStops([...colorStops, { color: "#ffffff", position: newPosition }]);
    }
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  const updateColorStop = (index: number, color: string, position: number) => {
    const newColorStops = [...colorStops];
    newColorStops[index] = { color, position };
    setColorStops(newColorStops.sort((a, b) => a.position - b.position));
  };

  const resetSettings = () => {
    setColorStops(defaultColorStops);
    setAngle(90);
    setNoiseAmount(0);
    setApplyNoise(false);
    setIsRadialGradient(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* Gradient Preview */}
      <div className="relative w-full aspect-video rounded-2xl lg:rounded-3xl overflow-hidden">
        <div className="absolute inset-0" style={gradientStyle}></div>
        <canvas
          ref={displayCanvasRef}
          width={1000}
          height={1000}
          className="absolute inset-0 w-full h-full mix-blend-overlay"
        />
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Color Stops */}
        <div className="flex flex-wrap items-center gap-2">
          {colorStops.map((stop, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="relative flex w-full max-w-[40px] items-center gap-3">
                <label htmlFor={`color-${index}`} className="text-lg font-bold">
                  <div
                    className="size-8 sm:size-10 cursor-pointer rounded-full border-2 border-border"
                    style={{ backgroundColor: stop.color }}
                  />
                </label>
                <Input
                  className="absolute left-0 top-3 opacity-0"
                  type="color"
                  id={`color-${index}`}
                  value={stop.color}
                  onChange={(e) =>
                    updateColorStop(index, e.target.value, stop.position)
                  }
                />
              </div>
              <Input
                type="number"
                min={0}
                max={100}
                value={stop.position}
                onChange={(e) =>
                  updateColorStop(index, stop.color, Number(e.target.value))
                }
                className="w-14 sm:w-16 h-8 text-xs sm:text-sm"
              />
              {colorStops.length > 2 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeColorStop(index)}
                >
                  <DIcons.Minus className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          {colorStops.length < 5 && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={addColorStop}
            >
              <DIcons.Plus className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Gradient Type & Angle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Label className={!isRadialGradient ? "font-medium text-xs sm:text-sm" : "text-xs sm:text-sm"}>
              Linear
            </Label>
            <Switch
              id="gradient-type"
              checked={isRadialGradient}
              onCheckedChange={(checked) => setIsRadialGradient(checked)}
            />
            <Label className={isRadialGradient ? "font-medium text-xs sm:text-sm" : "text-xs sm:text-sm"}>
              Radial
            </Label>
          </div>
          {!isRadialGradient && (
            <div className="flex w-full items-center gap-2">
              <Label className="w-auto text-xs sm:text-sm" htmlFor="angle">
                Angle
              </Label>
              <Slider
                id="angle"
                value={[angle]}
                min={0}
                max={360}
                className="w-full"
                onValueChange={(value) => setAngle(Number(value))}
              />
              <Label className="w-auto text-xs sm:text-sm" htmlFor="angle">
                {angle}°
              </Label>
            </div>
          )}
        </div>

        {/* Noise Control */}
        <div className="flex w-full items-center gap-2">
          <Switch
            id="apply-noise"
            checked={applyNoise}
            onCheckedChange={setApplyNoise}
          />
          <Label className="w-auto text-xs sm:text-sm" htmlFor="apply-noise">
            Texture
          </Label>
          {applyNoise && (
            <div className="flex w-full gap-2">
              <Slider
                id="noise"
                min={0}
                max={200}
                value={[noiseAmount]}
                className="w-full"
                onValueChange={(value) => setNoiseAmount(Number(value))}
              />
              <Label className="w-auto text-xs sm:text-sm" htmlFor="noise">
                {noiseAmount}
              </Label>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <Button
          size="sm"
          onClick={resetSettings}
          variant="secondary"
          className="w-full sm:w-auto"
        >
          <DIcons.RotateCw className="h-3 w-3 mr-2" />
          Reset
        </Button>
      </div>

      <canvas ref={canvasRef} width="1000" height="1000" style={{ display: "none" }} />
    </div>
  );
}
