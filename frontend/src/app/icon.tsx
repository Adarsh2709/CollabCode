import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0F14',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1px solid #2A3441',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 72 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Code Bracket Link (<) */}
          <path
            d="M 28 6 L 12 20 L 28 34 C 34 34 38 30 38 24 C 38 19.5 35 17.5 31 17.5 C 27 17.5 24 19.5 24 24"
            stroke="#3B82F6"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Code Bracket Link (>) */}
          <path
            d="M 44 34 L 60 20 L 44 6 C 38 6 34 10 34 16 C 34 20.5 37 22.5 41 22.5 C 45 22.5 48 20.5 48 16"
            stroke="#22C55E"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
