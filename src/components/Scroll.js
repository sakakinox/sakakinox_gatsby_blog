import React, { useState, useEffect } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, Fab } from '@mui/material';

const Scroll = ({
    showBelow,
}) => {

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    return (
        <Box
            component="span"
            zIndex={2}
            bottom="6%"
            right="4%"
            justifyContent='flex-end'
            aliginItems="flex-end"
            position='fixed'
        >
            {show &&
                <Fab sx='fabStyle' onClick={handleClick} aria-label="to top" component="span">
                    <ExpandLessIcon />
                </Fab>
            }
        </Box>
    )
}
export default Scroll