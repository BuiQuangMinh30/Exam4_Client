import { Helmet } from 'react-helmet-async';

import { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useParams } from 'react-router-dom';
// @types
import { IProduct, IProductFilter } from '../../@types/product';
// components
import FormProvider from '../../components/hook-form';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import { BooksBread, BookSearch, BookCards, BookFilter, BookLists, BookSort, BookTagFiltered } from './books';
import CartWidget from '../@dashboard/e-commerce/CartWidget';



// ----------------------------------------------------------------------

export default function BookPostsPage() {
    const { themeStretch } = useSettingsContext();
    const { id } = useParams()
    const dispatch = useDispatch();

    const { products, checkout } = useSelector((state) => state.product);

    const [openFilter, setOpenFilter] = useState(false);

    const defaultValues = {
        gender: [],
        category: 'All',
        colors: [],
        priceRange: [0, 200],
        rating: '',
        sortBy: 'featured',
    };

    const methods = useForm<IProductFilter>({
        defaultValues,
    });

    const {
        reset,
        watch,
        formState: { dirtyFields },
    } = methods;

    const isDefault =
        (!dirtyFields.gender &&
            !dirtyFields.category &&
            !dirtyFields.colors &&
            !dirtyFields.priceRange &&
            !dirtyFields.rating) ||
        false;

    const values = watch();

    const dataFiltered = applyFilter(products, values);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleResetFilter = () => {
        reset();
    };

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <>

            <FormProvider methods={methods}>
                <Container maxWidth={themeStretch ? false : 'lg'}>
                    <BooksBread />

                    <Stack
                        spacing={2}
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ sm: 'center' }}
                        justifyContent="space-between"
                        sx={{ mb: 2 }}
                    >
                        <BookSearch />

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                            <BookFilter
                                isDefault={isDefault}
                                open={openFilter}
                                onOpen={handleOpenFilter}
                                onClose={handleCloseFilter}
                                onResetFilter={handleResetFilter}
                            />

                            <BookSort />
                        </Stack>
                    </Stack>

                    <Stack sx={{ mb: 3 }}>
                        {!isDefault && (
                            <>
                                <Typography variant="body2" gutterBottom>
                                    <strong>{dataFiltered.length}</strong>
                                    &nbsp;Products found
                                </Typography>

                                <BookTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
                            </>
                        )}
                    </Stack>

                    <BookLists products={dataFiltered} loading={!products.length && isDefault} />

                    <CartWidget totalItems={checkout.totalItems} />
                </Container>
            </FormProvider>
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter(products: IProduct[], filters: IProductFilter) {
    const { gender, category, colors, priceRange, rating, sortBy } = filters;

    const min = priceRange[0];

    const max = priceRange[1];

    // SORT BY
    if (sortBy === 'featured') {
        products = orderBy(products, ['sold'], ['desc']);
    }

    if (sortBy === 'newest') {
        products = orderBy(products, ['createdAt'], ['desc']);
    }

    if (sortBy === 'priceDesc') {
        products = orderBy(products, ['price'], ['desc']);
    }

    if (sortBy === 'priceAsc') {
        products = orderBy(products, ['price'], ['asc']);
    }

    // FILTER PRODUCTS
    if (gender.length) {
        products = products.filter((product) => gender.includes(product.gender));
    }

    if (category !== 'All') {
        products = products.filter((product) => product.category === category);
    }

    if (colors.length) {
        products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
    }

    if (min !== 0 || max !== 200) {
        products = products.filter((product) => product.price >= min && product.price <= max);
    }

    if (rating) {
        products = products.filter((product) => {
            const convertRating = (value: string) => {
                if (value === 'up4Star') return 4;
                if (value === 'up3Star') return 3;
                if (value === 'up2Star') return 2;
                return 1;
            };
            return product.totalRating > convertRating(rating);
        });
    }

    return products;
}
