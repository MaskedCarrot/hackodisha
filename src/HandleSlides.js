export const HandleSlides = (ctx, array, ptr, direction) => {
    ptr += direction;

    // check double equal to??
    if(ptr === array.length || ptr < 0)
        return ptr = ptr - direction;
    ctx.drawImage(array[ptr], 0, 0);
    return ptr;
}

