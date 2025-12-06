import { useState } from "react";
import { GripVertical } from "lucide-react";
interface FeatureWithImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
}
export function FeatureWithImageComparison({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After"
}: FeatureWithImageComparisonProps) {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);
  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;
    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    const percentage = x / rect.width * 100;
    setInset(Math.max(0, Math.min(100, percentage)));
  };
  return <div className="w-full h-full">
      <div className="relative aspect-video w-full h-full overflow-hidden rounded-lg select-none" onMouseMove={onMouseMove} onMouseUp={() => setOnMouseDown(false)} onTouchMove={onMouseMove} onTouchEnd={() => setOnMouseDown(false)}>
        <div className="bg-foreground h-full w-1 absolute z-20 top-0 -ml-1 select-none" style={{
        left: inset + "%"
      }}>
          <button className="bg-background border border-border rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center" onTouchStart={e => {
          setOnMouseDown(true);
          onMouseMove(e);
        }} onMouseDown={e => {
          setOnMouseDown(true);
          onMouseMove(e);
        }} onTouchEnd={() => setOnMouseDown(false)} onMouseUp={() => setOnMouseDown(false)}>
            <GripVertical className="h-4 w-4 select-none" />
          </button>
        </div>
        <img src={afterImage} alt={afterAlt} style={{
        clipPath: "inset(0 0 0 " + inset + "%)"
      }} className="absolute left-0 top-0 z-10 w-full h-full rounded-lg select-none object-contain" />
        <img src={beforeImage} alt={beforeAlt} className="absolute left-0 top-0 w-full h-full rounded-lg select-none object-scale-down" />
      </div>
    </div>;
}