import React, { useEffect, useRef, useState } from "react";
import styles from "./Range.module.css";

interface IRangeProps {
  min: number;
  max: number;
}

const Range: React.FC<IRangeProps> = ({ min, max }) => {
  const [value, setValue] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const roundRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (position: number) => {
    if (lineRef.current) {
      const lineRect = lineRef.current.getBoundingClientRect();

      const sliderValue = Math.round(
        min + (position / lineRect.width) * (max - min)
      );

      console.log("sliderValue: ", sliderValue);
      setValue(Math.min(max, Math.max(min, sliderValue)));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleRoundMouseMove(e);
  };

  const handleRoundMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    if (lineRef.current && roundRef.current) {
      const lineRect = lineRef.current.getBoundingClientRect();
      const roundRect = roundRef.current.getBoundingClientRect();

      const position =
        e.nativeEvent.clientX - lineRect.left - roundRect.width / 2;
      handleValueChange(position);
    }
  };

  const handleWindowMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    if (lineRef.current && roundRef.current) {
      const lineRect = lineRef.current.getBoundingClientRect();
      const roundRect = roundRef.current.getBoundingClientRect();
      const position = e.clientX - lineRect.left - roundRect.width / 2;
      handleValueChange(position);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging, min, max]);

  const calculatePosition = () => {
    return ((value - min) / (max - min)) * 100;
  };

  const position = calculatePosition();

  return (
    <div className={styles.sliderContainer}>
      <p className={styles.value}>{value}</p>
      <div className={styles.line} ref={lineRef}>
        <div
          className={styles.round}
          style={{ left: `${position}%` }}
          ref={roundRef}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default Range;
