import React, { useState } from 'react';
import { Heading, useEloise } from '../..';
import { Table, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import {v4 as uuidv4} from "uuid"
import firebase from 'firebase/app';


const StyledTable = styled(Table)`
  // Your styled-components CSS goes here
`;
type ExpandProps = {
    expand: true;
    open?: false;
    expandComponent: React.ComponentType<{ data: any }>;
    link?: undefined;
  };
  
  type OpenProps = {
    expand?: false;
    open: true;
    expandComponent?: undefined;
    link: string;
  };
  
  type DefaultProps = {
    expand?: false;
    open?: false;
    expandComponent?: undefined;
    link?: undefined;
  };
  
  type BulkAction = {
    name: string;
    function: (docs: any[]) => void;
  };
  
  export type DBTableProps = { path: string; bulkActions?: BulkAction[] } & (ExpandProps | OpenProps | DefaultProps);
  
 export const DBTable: React.FC<DBTableProps> = ({
    path,
    bulkActions,
    expand = false,
    open = false,
    expandComponent: ExpandComponent,
    link,
  }) => {
    const { logic, theme } = useEloise();
    const navigate = useNavigate();
    const [docs, setDocs] = useState<any[] | null>(null);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
    const [selectedDocs, setSelectedDocs] = useState<Set<number>>(new Set());
  
  logic.hooks.useAsyncEffect(async () => {
    const data = await logic.fb.getUserCollection(path);
    setDocs(data);
  }, []);

  
  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const sortDocs = () => {
    if (!docs || !sortColumn) return docs;

    const sortedDocs = [...docs];
    sortedDocs.sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedDocs;
  };

  const getColumnOrder = () => {
    if (!docs || docs.length === 0) return [];

    const keys = Object.keys(docs[0].data);

    const orderedKeys = ['title'];
    if (keys.includes('type')) orderedKeys.push('type');
    orderedKeys.push(...keys.filter((key) => !['title', 'type'].includes(key)));

    return orderedKeys;
  };

  const renderTableHeader = () => {
    if (!docs || docs.length === 0) return null;
    const columns = getColumnOrder().map((key) => (
      <th key={key} onClick={() => handleSort(key)}>
        {logic.generic.capitalize(key)}
        {sortColumn === key && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
      </th>
    ));
  
    return (
      <tr key={uuidv4()}>
        {bulkActions && (
          <th style={{width: '60px'}}>
            <DropdownButton id="bulk-actions-dropdown" title="Bulk Actions" variant="secondary" size="sm">
              {bulkActions.map(({ name, function: actionFunction }, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    if (docs) {
                      const selectedDocsData = Array.from(selectedDocs).map((selectedIndex) => docs[selectedIndex]);
                      actionFunction(selectedDocsData);
                    }
                  }}
                >
                  {name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </th>
        )}
        {columns}
      </tr>
    );
  };
  

  const handleRowClick = (index: number, data: any) => {
    if (expand) {
      if (expandedRowIndex === index) {
        setExpandedRowIndex(null);
      } else {
        setExpandedRowIndex(index);
      }
    } else if (open && link) {
      navigate(link, { state: { data } });
    }
  };
  const handleRowSelect = (index: number) => {
    const newSelectedDocs = new Set(selectedDocs);
    if (selectedDocs.has(index)) {
      newSelectedDocs.delete(index);
    } else {
      newSelectedDocs.add(index);
    }
    setSelectedDocs(newSelectedDocs);
  };

  const isFirebaseTimestamp = (value: any): boolean => {
    return typeof value !== 'string'
  }
  const formatTimestamp = (timestamp:any): string => {
    return JSON.stringify(timestamp)
  };
  

  const renderTableBody = () => {
    if (!docs) return null;
  
    const sortedDocs = sortDocs();
    if (sortedDocs) {
      const rows = sortedDocs.map((doc, index) => {
        const cells = getColumnOrder().map((key, cellIndex) => {
          let cellValue = doc.data[key];
          if (isFirebaseTimestamp(cellValue)) {
            cellValue = formatTimestamp(cellValue);
          }
          return <td key={`${index}-${cellIndex}`}>{cellValue as string}</td>;
        });
  
        return (
          <>
            <tr key={index}>
              {bulkActions && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedDocs.has(index)}
                    onChange={() => handleRowSelect(index)}
                  />
                </td>
              )}
              {cells.map((cell, cellIndex) => (
                <td
                  key={`${index}-${cellIndex}`}
                  onClick={() => handleRowClick(index, doc.data)}
                >
                  {cell}
                </td>
              ))}
            </tr>
            {expand && ExpandComponent && expandedRowIndex === index && (
              <tr>
                <td colSpan={bulkActions ? getColumnOrder().length + 1 : getColumnOrder().length}>
                  <ExpandComponent data={doc.data} />
                </td>
              </tr>
            )}
          </>
        );
      });
  
      return <tbody>{rows}</tbody>;
    }
  };
  
 


  return (
    <>
     <Row>
       
       
            
        </Row>
    <StyledTable striped bordered hover responsive >
      <thead
      style={{borderBottom: `3px solid ${theme.primary}`, borderRadius: "3px"}}
      >{renderTableHeader()}</thead>
      {renderTableBody()}
    </StyledTable>
    </>
  );
};

