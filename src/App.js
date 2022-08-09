import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder, getItemStyle, getItems } from "./helpers";
import Form from "./components/Form";
import ContainerComponent from "./components/Container";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton from '@mui/material/IconButton';

const App = () => {
  const lsData = localStorage.getItem('populix-survey-items')
  const [items, setItems] = React.useState(!lsData ? [] : JSON.parse(lsData));

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);
  };

  const Index = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 8 }}>
        <Typography component="h1" variant="h5">
          Question List
        </Typography>
        <Button
          onClick={() => window.location.href = `/add`}
          variant='outlined'>
          Add Question
        </Button>
      </Box>
      {
        items && items.length ?
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{ mt: 4, minHeight: 'calc(100vh - 134px)', pb: 5 }}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          {item.question}
                          <IconButton onClick={() => window.location.href = `/edit#${item.id}`} color="primary" aria-label="delete">
                            <BorderColorIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          :
          <Typography
            sx={{ mt: 10, textAlign: 'center', minHeight: 'calc(100vh - 134px)' }}>
            You don't have any question list. Create new one!
          </Typography>
      }
    </>
  )

  if (window.location.pathname === '/add' || window.location.pathname === '/edit') return <ContainerComponent><Form /></ContainerComponent>
  return (
    <ContainerComponent>
      <Index />
    </ContainerComponent>
  )
}

export default App
