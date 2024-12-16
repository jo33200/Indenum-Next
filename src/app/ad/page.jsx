
import ListAd from "@/components/pages/ListAd";
import { pageMetadata } from "@/utils/metadata";


export const metadata = pageMetadata.ad;

const AdPage = () => {
  return (
    <div className="w-full">
      <ListAd />
    </div>
  );
};

export default AdPage;
