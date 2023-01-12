// @mui
import { List, Stack, Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';


export default function NavSectionVertical({ data }: any) {
    return (
        <Stack>
            {data.map((group: any) => {
                const key = group?.id || group.cate;
                return (
                    <Box
                        key={key}
                    >
                        <Link to={`/danh-muc/${group.id}`} style={{
                            textDecoration: 'none',
                            color: 'common.main',
                        }}>
                            <Typography sx={{
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                                padding: '12px 0 8px',
                                '&:hover': { color: 'primary.main' },
                            }} variant="subtitle2">{group.cate}</Typography>
                            <Divider />
                        </Link>

                    </Box>
                    // </List>
                );
            })}
        </Stack>
    );
}
