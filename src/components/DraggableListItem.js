import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

const DraggableListItem = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ background: snapshot.isDragging ? 'rgb(235,235,235)' : '' }}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <MailOutlinedIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.id} secondary={item.content} />
                </ListItem>
            )}
        </Draggable>
    );
};

export default DraggableListItem;
