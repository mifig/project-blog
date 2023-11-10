"use client";
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { motion } from 'framer-motion';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [playStatus, setPlayStatus] = React.useState("stop")
  const [timeElapsed, setTimeElapsed] = React.useState(0)
  const id = React.useId()
  
  React.useEffect(() => {
    if (playStatus === "play") {
      const incrementTime = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1)
      }, 1000)
      
      return () => {
        clearInterval(incrementTime)
      }
    } else if(playStatus === "stop") {
      setTimeElapsed(0)
    }
  }, [playStatus])

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColorIndex = timeElapsed - COLORS.length * Math.floor(timeElapsed / COLORS.length)
  const selectedColor = COLORS[selectedColorIndex];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  layoutId={`${id}`}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => setPlayStatus((currentStatus) => currentStatus === "play" ? "pause" : "play")}>
            { playStatus === "play" ? 
              <Pause />
              :
              <Play />
            }
            <VisuallyHidden>{playStatus === "play" ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={() => {
            setPlayStatus("stop")
          }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
