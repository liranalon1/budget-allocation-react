const TabItem = ({ children, active, onClick }) => (
    <div
        style={{
            padding: '10px',
            cursor: 'pointer',
            borderBottom: active ? '2px solid blue' : '2px solid transparent',
        }}
        onClick={onClick}
    >
        {children}
    </div>
);

export default TabItem;
