export const FormatDate = ({timestamp}) => {
    const date = new Date(timestamp);
    return (
        <h3>{date.toLocaleDateString()} {date.toLocaleTimeString()}</h3>
        )
};