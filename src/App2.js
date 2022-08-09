import * as React from 'react';
import { Paper } from '@mui/material';
import DraggableList from './components/DraggableList';
import { getItems, reorder } from './helpers';
import './styles.css';

const App = () => {
  const [items, setItems] = React.useState(getItems(10));

  const onDragEnd = ({ destination, source }) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  return (
    <>
      <Paper styles={{ flex: 1, margin: 16, minWidth: 350 }}>
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </Paper>
      <Paper styles={{ flex: 1, margin: 16, minWidth: 350 }}>
        {items.map(el => <div key={el.id}>{el.id}</div>)}
      </Paper>
    </>
  );
};

export default App;
