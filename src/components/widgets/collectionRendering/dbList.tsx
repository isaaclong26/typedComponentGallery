import React, { useState } from "react";
import { Loading, useEloise } from "../../../index";
import { UserDependentWidget } from "../userDependentWidget";

export interface DBListProps {
  noAuth?: boolean;
  path: string;
  Component: React.ComponentType<{
    data: any;
    update: (data: any) => Promise<any | false>;
    path: string;
  }>;
  Empty?: React.ComponentType;
  filter?: (data: any) => boolean; // added this line
  log?: boolean;
  id?: boolean;
}

interface DBListItemProps {
  noAuth?: boolean;
  path: string;
  Component: React.ComponentType<{
    data: any;
    update: (data: any) => Promise<any | false>;
    path: string;
    id?: string;
  }>;
  log?: boolean;
  data: any;
  id?: string;
}
export const DBItem: React.FC<DBListItemProps> = ({
  path,
  Component,
  noAuth,
  log,
  id,
  data,
}) => {
  const { logic } = useEloise();

  const [value, setValue] = useState(data);

  const update = async (data: any): Promise<any | false> => {
    let test = noAuth
      ? await logic.fb.docs.setDoc(path, data)
      : await logic.fb.docs.setUserDoc(path, data);
    if (test) {
      return data;
    } else {
      return false;
    }
  };

  return (
    <>
      {value && (
        <Component
          data={value}
          path={path}
          update={update}
          id={id}
        />
      )}
    </>
  );
};

export const DBList1: React.FC<DBListProps> = ({
  path,
  Component,
  Empty,
  filter,
  noAuth,
  log,
  id,
}) => {
  const { theme, logic, siteConfig } = useEloise();

  // Use your custom hook here to get real-time updates from Firestore
  const { docs, loading, error } = noAuth
    ? logic.fb.hooks.useCollection(path)
    : logic.fb.hooks.useUserCollection(path);

  // Log if needed
  log && console.log(docs, loading, error);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // If a filter function is provided, use it to filter the documents
  let filteredDocs = filter ? docs.filter(filter) : docs;

  if (filteredDocs.length === 0 && Empty) {
    return <Empty />;
  }

  return (
    <>
      {filteredDocs.map((value: any) => (
        <DBItem
          log={log}
          key={value.id}
          Component={Component}
          data={value.data}
          path={`${path}/${value.id}`}
          id={value.id}
        />
      ))}
    </>
  );
};

export const DBList: React.FC<DBListProps> = (props) => {
  return (
    <UserDependentWidget>
      <DBList1 {...props} />
    </UserDependentWidget>
  );
};
