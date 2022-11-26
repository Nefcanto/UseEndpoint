const Pagination = ({
    container,
    count,
    first,
    goTo,
    last,
    link,
    links,
    metadata,
    next,
    previous,
    size,
}) => {
    const linkClass = ' cursor-pointer ' + (link || "h-8 px-4 ")
    const {
        from,
        hasData,
        hasMore,
        pageNumber,
        pagesCount,
        pageSize,
        to,
        totalCount,
    } = metadata
    return <div className={container || ""}>
        {
            size && <div>size</div>
        }
        <div className={links || ""}>
            {first && <span className={first + linkClass}></span>}
            {previous && <span className={previous + linkClass}></span>}
            {[...Array(count || 5).keys()].map((i, index) => <span className={linkClass} key={index}>{i + 1}</span>)}
            {next && <span className={next + linkClass}></span>}
            {last && <span className={last + linkClass}></span>}
        </div>
        {
            goTo && <div>go to</div>
        }
    </div>
}

export default Pagination
