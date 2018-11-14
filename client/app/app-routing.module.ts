import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Homepage } from '@app/modules/home/home';
import { QueriesList } from '@app/modules/queries/list/queries';
import { NewQuery } from '@app/modules/queries/create/query';
import { QueryCharts } from '@app/modules/queries/charts/query';
import { DataSources } from '@app/modules/data-sources/data-sources.component';
import { DashboardView } from '@app/modules/dashboards/dashboards/view';
import { DataSourcesList } from '@app/modules/data-sources/data-sources-list.component';
import { JobsList } from '@app/modules/jobs/list';
import { NewJob } from '@app/modules/jobs/new';
import { ProjectList } from '@app/modules/projects/list';


const routes: Routes = [
    { path: '', redirectTo: 'queries', pathMatch: 'full' },
    { path: 'home', component: Homepage },
    { path: 'queries', component: QueriesList },
    { path: 'queries/new', component: NewQuery}, 
    { path: 'queries/:id', component: NewQuery},
    { path: 'queries/:id/charts', component: QueryCharts},
    { path: 'data_sources', component: DataSources},
    { path: 'data_sources/new', component: DataSourcesList},
    { path: 'data_sources/:id', component: DataSourcesList},
    { path: 'dashboards/:id', component: DashboardView },
    { path: 'jobs', component: JobsList },
    { path: 'jobs/new', component: NewJob },
    { path: 'projects', component: ProjectList },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { /*enableTracing: true, */ useHash: true })
    ],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }
