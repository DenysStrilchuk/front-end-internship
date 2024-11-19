import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";

import {ItemList} from "../ItemList";
import {ICompany} from "../../../models/ICompany";
import styles from "./CompaniesListView.module.css";

interface CompaniesListViewProps {
  title: string;
  items: ICompany[];
  getItemLink: (item: ICompany) => string;
  renderItem: (item: ICompany) => React.ReactNode;
  getItemId: (item: ICompany) => number;
}

const CompaniesListView: React.FC<CompaniesListViewProps> = ({
   title,
   items,
   getItemLink,
   renderItem,
   getItemId,
  }) => {
  const navigate = useNavigate();

  const handleItemClick = useCallback((item: ICompany) => {
    navigate(getItemLink(item));
  }, [getItemLink, navigate]);

  return (
    <div className={styles.container}>
      <ItemList
        items={items}
        title={title}
        renderItem={(item) => (
          <div onClick={() => handleItemClick(item)} className={styles.itemLink}>
            {renderItem(item)}
          </div>
        )}
        getItemId={getItemId}
      />
    </div>
  );
};
export {CompaniesListView};
