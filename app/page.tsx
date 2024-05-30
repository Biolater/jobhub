"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

const App = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <Authenticator />;
    </main>
  );
};

export default App;
