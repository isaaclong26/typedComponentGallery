import React, { useState } from 'react';
import { useEloise, Heading } from '../..';
import { Card, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



const StyledCardColumns = styled(Col)`
  // Your styled-components CSS goes here
`;
export type CardListProps =
  | {
      path: string;
      expand?: false;
      open?: false;
    }
  | {
      path: string;
      expand: true;
    }
  | {
      path: string;
      open: true;
      link: string;
    };



export const DBCards: React.FC<CardListProps> = (props) => {
  const { path, expand, open, link, } = props as any;
  const { logic } = useEloise();
  const [docs, setDocs] = useState<any[] | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<Set<number>>(new Set());

  const navigate = useNavigate();

  logic.hooks.useAsyncEffect(async () => {
    const data = await logic.fb.docs.getUserCollection(path);
    setDocs(data);
  }, []);

  // handleSort, sortDocs, handleRowClick, and getColumnOrder functions are the same as in the SortableTable component

   
  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
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


  const isFirebaseTimestamp = (value: any): boolean => {
    return typeof value !== 'string'
  }

  const formatTimestamp = (timestamp:any): string => {
    return JSON.stringify(timestamp)
  };
  
  

  const getColumnOrder = () => {
    if (!docs || docs.length === 0) return [];

    const keys = Object.keys(docs[0].data);

    const orderedKeys = ['title'];
    if (keys.includes('type')) orderedKeys.push('type');
    orderedKeys.push(...keys.filter((key) => !['title', 'type'].includes(key)));

    return orderedKeys;
  };
  const renderCards = () => {
    if (!docs) return null;
  
    const sortedDocs = sortDocs();
    if (sortedDocs) {
      return sortedDocs.map((doc, index) => (
        <Card
        className="col-lg-4"
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            if (expand) {
              setExpandedRowIndex(expandedRowIndex === index ? null : index);
            } else if (open && link) {
              navigate(link, { state: { data: doc.data } });
            }
          }}
        >
          <Card.Body>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Object.entries(doc.data).map(([key, value], entryIndex) => {
          if (isFirebaseTimestamp(value)) {
            value = formatTimestamp(value);
          }

          return (
            <div
              key={`${index}-${entryIndex}`}
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}
            >
              <label>{logic.generic.capitalize(key)}</label>
              <input
                type="text"
                defaultValue={value as string}
                // Implement your save/update functionality here, e.g., using the `onBlur` or `onChange` event
                // onBlur={(e) => updateValue(doc.id, key, e.target.value)}
              />
            </div>
          );
        })}
      </div>
          </Card.Body>
          {expand  && expandedRowIndex === index && (
            <Card.Footer>
            </Card.Footer>
          )}
        </Card>
      ));
    }
  };
  
  

  return (
    <>
        <Row>
        
            <Col lg={3} >
                 <DropdownButton  style={{textAlign:'left'}} id="sort-dropdown" title="Sort" variant="secondary">
        {getColumnOrder().map((key, index) => (
          <Dropdown.Item key={index} onClick={() => handleSort(key)}>
            {logic.generic.capitalize(key)}
            {sortColumn === key && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
          </Dropdown.Item>
        ))}
      </DropdownButton>
            </Col>
            
        </Row>
     
     
      <StyledCardColumns>{renderCards()}</StyledCardColumns>
    </>

  )
        }