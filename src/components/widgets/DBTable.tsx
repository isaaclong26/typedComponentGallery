import React, { useEffect, useState } from 'react';
import { Heading, useEloise } from '../..';
import { Table, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import {v4 as uuidv4} from "uuid"
import firebase from 'firebase/app';

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1') // Add a space before each uppercase letter
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
}

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

export type DBTableProps1 = { path: string; bulkActions?: BulkAction[] } & (ExpandProps | OpenProps | DefaultProps);
export type FieldSelection = 'manual' | string[];

export type DBTableProps = {
  fields?: FieldSelection;
  manualDefault?: string[]
} & DBTableProps1;

export const DBTable: React.FC<DBTableProps> = ({
  fields,
  manualDefault,
  path,
  bulkActions,
  expand = false,
  open = false,
  expandComponent: ExpandComponent,
  link,
}) => {
  const { logic, theme } = useEloise();
  const navigate = useNavigate();
  const [docs, setDocs] = useState<any[] >([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<Set<number>>(new Set());

  const [selectedFields, setSelectedFields] = useState<Set<string>>( new Set());

  useEffect(()=>{
      if(manualDefault){
          setSelectedFields(new Set(manualDefault))
      }
  },[])
logic.hooks.useAsyncEffect(async () => {
  const data = await logic.fb.getUserCollection(path);
  if(data){
  console.log(data)
  setDocs(data);
  if(manualDefault){
      setSelectedFields(new Set(manualDefault))
  }
  else{
  let fieldsTemp = Object.keys(data[0].data)
  setSelectedFields(new Set(fieldsTemp))
  }
  }
 

}, []);


const toggleFieldSelection = (field: string) => {
  const newSelectedFields = new Set(selectedFields);
  if (selectedFields.has(field)) {
    newSelectedFields.delete(field);
  } else {
    newSelectedFields.add(field);
  }
  setSelectedFields(newSelectedFields);
};

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

  if (fields === 'manual') {
    return Array.from(selectedFields);
  }

  if (Array.isArray(fields)) {
    return keys.filter((key) => fields.includes(key));
  }
  if (!docs || docs.length === 0) return [];


  const orderedKeys = ['title'];
  if (keys.includes('type')) orderedKeys.push('type');
  orderedKeys.push(...keys.filter((key) => !['title', 'type'].includes(key)));

  return orderedKeys;
};

const renderTableHeader = () => {
  if (!docs || docs.length === 0) return null;
  const columns = getColumnOrder().map((key) => (
    <th key={key} onClick={() => handleSort(key)}>
      {formatKey(key)}
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

const renderFieldSelectionButton = () => {
  if (fields !== 'manual') return null;

  return (
    <DropdownButton id="field-selection-dropdown" title="Select Fields" variant="secondary" size="sm">
      <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        {docs && docs[0] && Object.keys(docs[0].data).map((field, index) => (
          <Dropdown.Item key={index} onClick={() => toggleFieldSelection(field)}>
            {selectedFields.has(field) ? '✓ ' : '   '}
            {formatKey(field)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </DropdownButton>
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
    navigate(link+data);
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
                onClick={() => handleRowClick(index, doc.id)}
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
   <Row className="my-3">
 
      {fields === 'manual' && (
        <Col lg={1}>
          {renderFieldSelectionButton()}
        </Col>
      )}
      {/* ... (other columns if needed) */}
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

