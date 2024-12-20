import ListAd from "@/components/pages/ListAd";
import { pageMetadata } from "@/utils/metadata";

export const metadata = pageMetadata.ad;

const AdPage = () => {
  return (
    <div className="w-full" aria-labelledby="ad-page-title">
      <h1 id="ad-page-title" className="sr-only">
        Nos annonces - Indenum
      </h1>
      <ListAd />
    </div>
  );
};

export default AdPage;
