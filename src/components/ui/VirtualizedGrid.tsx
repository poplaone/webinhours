import React, { useState, useEffect, useRef, useMemo } from 'react';

interface VirtualizedGridProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number; // Number of items to render outside visible area
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  gap?: number;
  columns?: number;
}

export function VirtualizedGrid<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
  renderItem,
  keyExtractor,
  gap = 16,
  columns = 1
}: VirtualizedGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const { startIndex, endIndex, visibleItems, totalHeight } = useMemo(() => {
    const totalItems = items.length;
    const itemsPerRow = Math.floor(containerHeight / (itemHeight + gap));
    const totalRows = Math.ceil(totalItems / columns);

    const scrollTopAdjusted = Math.max(0, scrollTop);
    const startRow = Math.floor(scrollTopAdjusted / (itemHeight + gap));
    const endRow = Math.min(
      totalRows - 1,
      Math.ceil((scrollTopAdjusted + containerHeight) / (itemHeight + gap))
    );

    const startIndex = Math.max(0, startRow * columns - overscan);
    const endIndex = Math.min(
      totalItems,
      (endRow + 1) * columns + overscan
    );

    const visibleItems = [];
    for (let i = startIndex; i < endIndex && i < totalItems; i++) {
      visibleItems.push({
        item: items[i],
        index: i,
        row: Math.floor(i / columns),
        col: i % columns
      });
    }

    const totalHeight = totalRows * (itemHeight + gap);

    return {
      startIndex,
      endIndex,
      visibleItems,
      totalHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop, overscan, columns, gap]);

  // Handle scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={scrollElementRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: gap,
            padding: gap / 2
          }}
        >
          {visibleItems.map(({ item, index, row, col }) => (
            <div
              key={keyExtractor(item, index)}
              style={{
                position: 'absolute',
                top: row * (itemHeight + gap),
                left: col * (100 / columns) + '%',
                width: `calc(${100 / columns}% - ${gap}px)`,
                height: itemHeight
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simplified masonry version for website cards
export function VirtualizedMasonry<T>({
  items,
  renderItem,
  keyExtractor,
  containerHeight = 600,
  columnWidth = 300
}: VirtualizedGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // Calculate columns based on container width
  const columns = Math.max(1, Math.floor(scrollElementRef.current?.clientWidth || 0 / columnWidth));

  // Calculate visible items
  const { startIndex, endIndex, visibleItems, totalHeight } = useMemo(() => {
    if (!scrollElementRef.current) {
      return { startIndex: 0, endIndex: 0, visibleItems: [], totalHeight: 0 };
    }

    const totalItems = items.length;
    const columnHeights = new Array(columns).fill(0);
    const itemsPerColumn: { item: T; index: number; top: number; height: number }[][] = new Array(columns).fill(null).map(() => []);

    // Calculate item positions
    for (let i = 0; i < totalItems; i++) {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const item = items[i];
      const top = columnHeights[shortestColumn];

      // Estimate height (you might want to make this dynamic)
      const estimatedHeight = 400; // Adjust based on your card size

      itemsPerColumn[shortestColumn].push({
        item,
        index: i,
        top,
        height: estimatedHeight
      });

      columnHeights[shortestColumn] += estimatedHeight + 16; // gap
    }

    const maxHeight = Math.max(...columnHeights);
    const scrollTopAdjusted = Math.max(0, scrollTop);
    const startRow = Math.floor(scrollTopAdjusted / 200); // Row height
    const endRow = Math.ceil((scrollTopAdjusted + containerHeight) / 200);

    const visibleItems: T[] = [];
    for (let col = 0; col < columns; col++) {
      for (let i = startRow; i < endRow && i < itemsPerColumn[col].length; i++) {
        if (i >= startIndex && i < endIndex) {
          visibleItems.push(itemsPerColumn[col][i].item);
        }
      }
    }

    return {
      startIndex,
      endIndex,
      visibleItems,
      totalHeight: maxHeight
    };
  }, [items, columns, scrollTop, containerHeight]);

  return (
    <div
      ref={scrollElementRef}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.slice(0, 100).map((item, index) => (
          <div key={keyExtractor(item, index)}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
