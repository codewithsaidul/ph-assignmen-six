import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function FareBreakDown( { fare, platformEarnings, commisionRate }: { fare: number, platformEarnings: number, commisionRate: number } ) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Fare Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span>
              ৳
              {(
                (fare as number) - platformEarnings
              ).toFixed(2) || 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>৳{platformEarnings || 0}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Fare</span>
              <span>৳{fare || 0}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Commission Rate: {(commisionRate as number) * 100}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
