// Angular Modules
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE                 } from '@angular/material/core';
import { MAT_RADIO_DEFAULT_OPTIONS       } from '@angular/material/radio';
import { MAT_DATE_FORMATS                } from '@angular/material/core';
import { NGX_MAT_DATE_FORMATS            } from '@angular-material-components/datetime-picker';

import { CdkTableModule                  } from '@angular/cdk/table';
import { CommonModule                    } from '@angular/common';
import { HttpClientModule                } from '@angular/common/http';
import { FormsModule                     } from '@angular/forms';
import { FlexLayoutModule                } from '@angular/flex-layout';
import { NgModule, ModuleWithProviders   } from '@angular/core';
import { MatMomentDateModule             } from '@angular/material-moment-adapter';
import { MomentDateAdapter               } from '@angular/material-moment-adapter';
import { MatAutocompleteModule           } from '@angular/material/autocomplete';
import { MatButtonModule                 } from '@angular/material/button';
import { MatCardModule                   } from '@angular/material/card';
import { MatDialogModule                 } from '@angular/material/dialog';
import { MatDatepickerModule             } from '@angular/material/datepicker';
import { DateAdapter                     } from '@angular/material/core';
import { MatCheckboxModule               } from '@angular/material/checkbox';
import { MatChipsModule                  } from '@angular/material/chips';
import { MatFormFieldModule              } from '@angular/material/form-field';
import { MatIconModule                   } from '@angular/material/icon';
import { MatInputModule                  } from '@angular/material/input';
import { MatListModule                   } from '@angular/material/list';
import { MatMenuModule                   } from '@angular/material/menu';
import { MatNativeDateModule             } from '@angular/material/core';
import { MatPaginatorModule              } from '@angular/material/paginator';
import { MatTableModule                  } from '@angular/material/table';
import { MatTabsModule                   } from '@angular/material/tabs';
import { MatTooltipModule                } from '@angular/material/tooltip';
import { MatToolbarModule                } from '@angular/material/toolbar';
import { MatSelectModule                 } from '@angular/material/select';
import { MatSidenavModule                } from '@angular/material/sidenav';
import { MatSnackBarModule               } from '@angular/material/snack-bar';
import { MatTreeModule                   } from '@angular/material/tree';
import { ReactiveFormsModule             } from '@angular/forms';
import { RouterModule                    } from '@angular/router';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


// App libraries
import { httpInterceptorProviders        } from './providers/http-interceptors.provider';
import { RouteGuard                      } from './guards/route.guard';
import { LoginGuard                      } from './guards/login.guard';
import { ListadoDataSource               } from './listado.datasource';

// App Services
import { ApiService                      } from './services/api.service';
import { ConfirmService                  } from './services/confirm.service';
import { MessagesService                 } from './services/messages.service';
import { NavigationService               } from './services/navigation.service';
import { SnackBarService                 } from './services/snack-bar.service';

// App Components
import { ButtonsBarComponent             } from './buttons-bar/buttons-bar.component';
import { ChipsFieldComponent             } from './chips-field/component';
import { ChipsInputComponent             } from './chips-input/component';
import { ConfirmComponent                } from './confirm/confirm.component';
import { ConfirmYesNoComponent           } from './confirmYesNo/confirm.component';    
import { DashboardComponent              } from './dashboard/dashboard.component';
import { DatePickerComponent             } from './date-picker/date-picker.component';
import { DatepickerInputComponent        } from './datepicker-input/component';
import { DateTimePickerComponent         } from './date-time-picker/component';
import { FileUploadButtonComponent       } from './file-upload-button/file-upload-button.component';
import { FormTextComponent               } from './form-text/form-text.component';
import { FormSectionComponent            } from './form-section/form-section.component';
import { FormSectionExtranetComponent    } from './form-section-extranet/form-section.component';
import { HomeComponent                   } from './home/home.component';
import { ListadoEncabezadoComponent      } from './listado-encabezado/listado-encabezado.component';
import { ListadoFiltradoComponent        } from './listado-filtrado/listado-filtrado.component';
import { ListadoFiltrosComponent         } from './listado-filtros/listado-filtros.component';
import { MainToolbarComponent            } from './main-toolbar/main-toolbar.component';
import { MainToolbarExtranetComponent    } from './main-toolbar-extranet/main-toolbar-extranet.component';
import { MatRadioModule                  } from '@angular/material/radio';
import { MessageComponent                } from './message/message.component';
import { NgxMatDatetimePickerModule      } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule              } from '@angular-material-components/moment-adapter';
import { RichTextFieldComponent          } from './rich-text-field/rich-text-field.component';
import { SectionTitleComponent           } from './section-title/section-title.component';
import { SectionTitleExtranetComponent   } from './section-title-extranet/section-title.component-extranet';
import { SearchInputComponent            } from './search-input/search-input.component';
import { ServerAutocompleteComponent     } from './server-autocomplete/server-autocomplete.component';
import { SidenavComponent                } from './sidenav/sidenav.component';
import { StaticMapPlaceComponent         } from './static-map-place/static-map-place.component';
import { TableComponent                  } from './table/table.component';
import { ToolbarComponent                } from './toolbar/toolbar.component';
import { TreeComponent                   } from './tree/tree.component';
import { UserSectionComponent            } from './user-section/user-section.component';

// Directivas
import { InputNumericDirective } from './input-numeric.directive';

@NgModule({
    declarations: [
        ButtonsBarComponent,
        ChipsFieldComponent,
        ChipsInputComponent,
        ConfirmComponent,
        ConfirmYesNoComponent,
        DashboardComponent,
        DatePickerComponent,
        DatepickerInputComponent,
        DateTimePickerComponent,
        FileUploadButtonComponent,
        FormSectionComponent,
        FormSectionExtranetComponent,
        FormTextComponent,
        HomeComponent,
        InputNumericDirective,
        ListadoEncabezadoComponent,
        ListadoFiltradoComponent,
        ListadoFiltrosComponent,
        MessageComponent,
        MainToolbarComponent,
        MainToolbarExtranetComponent,
        RichTextFieldComponent,
        SearchInputComponent,
        SectionTitleComponent,
        SectionTitleExtranetComponent,
        ServerAutocompleteComponent,
        SidenavComponent,
        StaticMapPlaceComponent,
        TableComponent,
        ToolbarComponent,
        TreeComponent,
        UserSectionComponent,
    ],
    imports: [
        CdkTableModule,
        CommonModule,
        CKEditorModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatMomentDateModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTableModule,
        MatTabsModule,
        MatTreeModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [

        // Modules
        CdkTableModule,
        CKEditorModule,
        FormsModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        ReactiveFormsModule,

        // Components
        ButtonsBarComponent,
        ChipsFieldComponent,
        ChipsInputComponent,
        DashboardComponent,
        DatePickerComponent,
        DatepickerInputComponent,
        DateTimePickerComponent,
        FileUploadButtonComponent,
        FormSectionComponent,
        FormSectionExtranetComponent,
        FormTextComponent,
        ListadoFiltradoComponent,
        ListadoFiltrosComponent,
        ListadoEncabezadoComponent,
        RichTextFieldComponent,
        SectionTitleComponent,
        SectionTitleExtranetComponent,
        SearchInputComponent,
        ServerAutocompleteComponent,
        SidenavComponent,
        StaticMapPlaceComponent,
        TableComponent,
        ToolbarComponent,
        TreeComponent,

        //Directivas
        InputNumericDirective,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: MAT_RADIO_DEFAULT_OPTIONS,
                    useValue: { color: 'accent' },
                },
                httpInterceptorProviders,
                ApiService,
                ConfirmService,
                ListadoDataSource,
                LoginGuard,
                MessagesService,
                NavigationService,
                RouteGuard,
                SnackBarService,
                { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
                {
                    provide: MAT_DATE_FORMATS,
                    useValue: {
                        parse: {
                            dateInput: [
                                'YYYY-MM-DD', // from
                                'DD-MM-YYYY', // to
                            ],
                        },
                        display: {
                            dateInput:          'DD-MM-YYYY',
                            monthYearLabel:     'MMM YYYY',
                            dateA11yLabel:      'DD-MM-YYYY',
                            monthYearA11yLabel: 'MMMM YYYY',
                        },
                    },
                },
                {
                    provide: DateAdapter,
                    useClass: MomentDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
                },
                {
                    provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
                    useValue: { useUtc: true }
                },
                { 
                    provide: NGX_MAT_DATE_FORMATS, 
                    useValue: {
                        parse: {
                            dateInput: 'YYYY-MM-DD HH:mm'
                        },
                        display: {
                            dateInput: 'DD-MMM-YYY HH:mm',
                            monthYearLabel: 'MM-YYYY',
                            dateA11yLabel: 'LL',
                            monthYearA11yLabel: 'MM-YYYY',
                        }
                    },
                }
            ]
        }
    }
}
