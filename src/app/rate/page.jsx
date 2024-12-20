import ListRates from "@/components/pages/ListRates";
import { pageMetadata } from "@/utils/metadata";

export const metadata = pageMetadata.rate;

const RatesPage = () => {
  return (
    <div className="w-full" aria-labelledby="page-title">
      <h1 id="page-title" className="sr-only">
        Tarifs de nos réparations
      </h1>
      <ListRates />
    </div>
  );
};

export default RatesPage;
