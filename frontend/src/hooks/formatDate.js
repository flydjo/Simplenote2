function useFormatDate(date) {
    const d = new Date(date);
    const dateWithFormat = d.toLocaleDateString();

    return dateWithFormat;
}

export default useFormatDate;