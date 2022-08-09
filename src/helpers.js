export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

export const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    border: isDragging ? '1px #7ca9d6 solid' : '1px #bbb solid',
    background: isDragging ? "#f3f7fa" : "white",
    ...draggableStyle
});