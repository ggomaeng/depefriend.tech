'use client';

import React, { useState } from 'react';
import queryString from 'query-string';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [startTimestamp] = useState(Date.now());

  const searchParams = queryString.stringify({
    text: `I want to be depefriend.\n\nhttps://depefriend.tech`,
    'embeds[]': 'https://depefriend.tech',
  });

  return (
    <button
      {...props}
      onClick={() => {
        const random = Math.random();
        const now = Date.now();
        const message = `👌 congrats. you found me in ${((now - startTimestamp) / 1000).toFixed(2)} seconds!`;
        if (random > 0.95) {
          alert(message);
        }

        const href = `https://warpcast.com/~/compose?${searchParams}`;
        window.open(href, '_blank');
      }}
      style={{
        fontSize: 20,
      }}
    >
      {props.children}
    </button>
  );
}
