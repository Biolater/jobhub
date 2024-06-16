import { useState, useEffect } from "react";

export default function useTextTrimmer() {
  const [text, setText] = useState("");
  const [trimmedText, setTrimmedText] = useState("");
  const [showTrimmedText, setShowTrimmedText] = useState(false);

  useEffect(() => {
    if (text) {
      const wordSplits = text?.split(" ");
      if (wordSplits && wordSplits.length > 150) {
        setShowTrimmedText(true);
        setTrimmedText(wordSplits.slice(0, 150).join(" ") + "...");
      } else {
        setShowTrimmedText(false);
      }
    }
  }, [text]);

  return { trimmedText, showTrimmedText, text, setText, setShowTrimmedText };
}
