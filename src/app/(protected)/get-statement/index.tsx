import { router } from "expo-router";

import { StatementRequestForm } from "@/features/card/components/statement-request-form";

export default function GetStatementScreen() {
  return (
    <StatementRequestForm
      title="Get Card Statement"
      fallbackHref="/(protected)/(tabs)/card"
      onSubmitSuccess={() => router.dismissTo("/card")}
    />
  );
}
