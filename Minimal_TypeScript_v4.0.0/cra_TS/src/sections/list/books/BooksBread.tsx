import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';


export default function BooksBread() {
    return (
        <CustomBreadcrumbs
            heading="Thư viện"
            links={[
                { name: 'Loại sách' },
                {
                    name: 'Trinh thám',
                },
            ]}
        />
    )
}