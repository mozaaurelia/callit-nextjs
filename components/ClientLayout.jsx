  "use client";
  import { useState } from "react";
  import SplashScreen from "@/components/SplashScreen";

  export default function ClientLayout({ children }) {
    const [showSplash, setShowSplash] = useState(true);

    return (
      <>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
        <div
          style={{
            opacity: showSplash ? 0 : 1,
            transition: "opacity 0.4s ease 0.1s",
          }}
        >
          {children}
        </div>
      </>
    );
  }

  // splassh di splash client di index tronya