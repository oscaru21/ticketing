select
    offers.object_id,
    offers.name,
    p.value Logistic_Provider
from
    nc_params p,
    nc_attributes a,
    (
        select
            o.*
        from
            nc_references pr,
            nc_references cr,
            nc_objects o
        where
            pr.object_id = cr.object_id --find all child product offerings
            and cr.attr_id = 9135378710613415627
            /* Child */
            and pr.attr_id = 9135377944913415569
            /* Parent */
            and pr.reference = 9159705859113569078
            /* WHSIA Equipment */
            and o.object_id = cr.reference
    ) offers
where
    a.attr_id = p.attr_id
    and a.name = 'Value'
    and p.object_id in (
        select
            object_id
        from
            nc_objects
        where
            name = 'Logistic Provider'
            and parent_id in (offers.object_id)
    )
