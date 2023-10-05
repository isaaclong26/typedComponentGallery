import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Loading, useEloise } from "../../../"; // Update the import path

/**
 * Styled component for the horizontal scroll container.
 */
const HorizontalScrollContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  cursor: grab;

  ::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * Props interface for the FlatList component.
 */
interface FlatListProps {
  /**
   * The path from which data should be fetched.
   */
  path: string;
  filter?: (data: any) => boolean; // added this line
  noAuth?: boolean;
  /**
   * Component to render each item in the list.
   */
  Component: React.ComponentType<{
    data: any;
    update: (data: any) => Promise<any | false>;
    select?: (data: any) => void; // Optional prop for selection
  }>;
  Empty?: React.ComponentType; // added this line

  /**
   * Optional function for item selection
   */
  select?: (data: any) => void;
}

/**
 * The FlatList component.
 * Fetches data from the provided path and renders it as a horizontally scrolling list.
 *
 * @param {FlatListProps} props The props passed to the FlatList component.
 * @returns {JSX.Element} The rendered horizontal list.
 */
const FlatList: React.FC<FlatListProps> = ({
  path,
  Component,
  select,
  Empty,
  filter,
  noAuth,
}) => {
  /**
   * Custom hook useEloise assumed to provide logic for fetching and updating data.
   */
  const { logic } = useEloise();

  /**
   * State to hold the fetched data.
   */
  const [data, setData] = useState<any[]>();

  /**
   * Reference to the scrolling container.
   */
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Fetch data on component mount and set it to the state.
   */
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = noAuth
        ? await logic.fb.docs.getCollection(path)
        : await logic.fb.docs.getUserCollection(path);
      setData(fetchedData);
    };

    fetchData();
  }, [path, logic.fb]);

  /**
   * Function to update data. Assumes logic in useEloise for updating data.
   *
   * @param {any} data The data to update.
   * @returns {Promise<any | false>} The updated data or false if the update was not successful.
   */
  const update = async (data: any): Promise<any | false> => {
    const result = await logic.fb.docs.setUserDoc(path, data);
    return result ? data : false;
  };

  /**
   * Effect to handle the horizontal scrolling behavior when the user scrolls vertically.
   */
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += event.deltaY;
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  /**
   * Render the horizontal list.
   */
  if (!data) {
    return <Loading />;
  }

  let filteredDocs = filter ? data.filter(filter) : data;

  if (filteredDocs && filteredDocs.length === 0 && Empty) {
    return <Empty />;
  }

  return (
    <HorizontalScrollContainer ref={scrollRef}>
      {filteredDocs &&
        filteredDocs.map((item, index) => (
          <div
            key={index}
            style={{ display: "inline-block" }}>
            <Component
              data={item}
              update={update}
              select={select} // Passing the select function to the child Component
            />
          </div>
        ))}
    </HorizontalScrollContainer>
  );
};

export default FlatList;
