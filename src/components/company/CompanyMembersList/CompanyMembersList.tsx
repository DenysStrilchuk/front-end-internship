import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loader} from "../../common/LoaderContainer";
import {IUser} from "../../../models/IUser";
import {deleteMember, fetchMembersList} from "../../../store/slices/companySlice";
import styles from "./CompanyMembersList.module.css";

interface CompanyMembersListProps {
  companyId: number;
}

const CompanyMembersList: React.FC<CompanyMembersListProps> = ({companyId}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {membersList, loading, error} = useAppSelector((state) => state.companies);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchMembersList(companyId));
    }
  }, [dispatch, companyId, isOpen]);

  const toggleList = () => setIsOpen((prev) => !prev);

  const handleDeleteMember = async (actionId: number) => {
    try {
      await dispatch(deleteMember(actionId)).unwrap();
    } catch {
      setDeleteError(t(`companyMembersList.${deleteError}`));
    }
  };

  return (
    <div className={styles.container}>
      <h3 onClick={toggleList} className={styles.header}>
        {t("companyMembersList.title")}
      </h3>
      {isOpen && (
        <div>
          {loading && <Loader/>}
          {error && (
            <p className={styles.error}>
              {t(`companyMembersList.${error}`) || t("companyMembersList.errors.unknownError")}
            </p>
          )}
          {!loading && !error && (
            <div>
              {membersList && membersList.result.users.length > 0 ? (
                <ul className={styles.list}>
                  {membersList.result.users.map((user: IUser) => (
                    <li key={user.user_id} className={styles.listItem}>
                      <span>
                        {user.user_firstname} {user.user_lastname}
                      </span>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => user.action_id !== undefined && handleDeleteMember(user.action_id)}
                        sx={{marginLeft: 2}}
                      >
                        {t("companyMembersList.cancelInvite")}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.noMembers}>{t("companyMembersList.noMembers")}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export {CompanyMembersList};
