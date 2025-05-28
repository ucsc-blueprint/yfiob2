import { Suspense } from "react";
import ChooseAccountTypeClient from "./ChooseAccountTypeClient";

export default function ChooseAccountTypePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseAccountTypeClient />
    </Suspense>
  );
}