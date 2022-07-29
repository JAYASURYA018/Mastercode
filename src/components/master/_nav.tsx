function _nav(t: any) {

    const defaultNs = { ns: 'common' }
    let ScriptDesigner = t('common.menu.scriptDesigner', defaultNs);
    let Reports = t('common.menu.reports', defaultNs);
    let Historical = t('common.menu.reports.historical', defaultNs);
    let ScheduleReport = t('common.menu.reports.schedule', defaultNs);
    let DataExtract = t('common.menu.reports.extract', defaultNs);
    let AETools = t('common.menu.AEtools', defaultNs);
    let PurgeArchive = t('common.menu.AETools.archive', defaultNs);
    let ContactStrategy = t('common.menu.contactStrategy', defaultNs);

    const navigation = [
        {
            _tag: "CSidebarNavItem",
            name: ContactStrategy,
            to: `${process.env.PUBLIC_URL}/contactStrategy`,
            fontIcon: "icon-left-menu-cont-strat",
            id: "Menu-Contact-Strategy",
        },
        {
            _tag: "CSidebarNavItem",
            name: ScriptDesigner,
            to: `${process.env.PUBLIC_URL}/script-designer`,
            fontIcon: "icon-left-menu-script",
            id: "Menu-Script-Designer",
        },
        {
            _tag: "CSidebarNavDropdown",
            name: Reports,
            route: `${process.env.PUBLIC_URL}/reports`,
            fontIcon: "icon-users-reports",
            id: "Menu-Reports",
            _children: [
                {
                    _tag: "CSidebarNavItem",
                    name: Historical,
                    to: `${process.env.PUBLIC_URL}/reports/historical`,
                    icon: "cil-grid",
                    id: "Menu-Historical",
                },
                {
                    _tag: "CSidebarNavItem",
                    name: ScheduleReport,
                    to: `${process.env.PUBLIC_URL}/reports/schedule-reports`,
                    icon: "cil-calendar",
                    id: "Menu-Schedule-Report",
                },
                {
                    _tag: "CSidebarNavItem",
                    name: DataExtract,
                    to: `${process.env.PUBLIC_URL}/reports/data-extraction`,
                    icon: "cil-calendar",
                    id: "Menu-Schedule-Report",
                },
            ],
        },
        {
            _tag: "CSidebarNavDropdown",
            name: AETools,
            to: `${process.env.PUBLIC_URL}/aetools`,
            fontIcon: "icon-left-menu-system",
            id: "Menu-AeTools",
            _children: [
                {
                    _tag: "CSidebarNavItem",
                    name: PurgeArchive,
                    to: `${process.env.PUBLIC_URL}/aetools/purge-archive`,
                    icon: "cil-calendar",
                    id: "Menu-Archive-Purge",
                },
            ],
        },
    ];


    return navigation;

}


export default _nav;
