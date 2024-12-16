import ListRates from "@/components/pages/ListRates";
import { pageMetadata } from "@/utils/metadata";

export const metadata = pageMetadata.rate;

const RatesPage = () => {
  return (
    <div className="w-full">
      <ListRates />
    </div>
  );
};

export default RatesPage;
