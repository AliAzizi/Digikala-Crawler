import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export default mongoose.model("Products", Schema({
    id: {
        type: Number
    },
    category_id: {
        type: Number
    },
    title_fa: {
        type: String
    },
    title_en: {
        type: String
    },
    rating: {
        rate: {
            type: Number
        },
        count: {
            type: Number
        }
    },
    status: {
        type: String
    },
    images: {
        main: {
            type: String
        }
    },
    default_variant_id: {
        type: Number
    },
    parameters: {
        color_ids: {
            type: [
                Number
            ]
        }
    },
    properties: {
        is_fast_shopping: {
            type: Boolean
        },
        is_ship_by_seller: {
            type: Boolean
        },
        is_multi_warehouse: {
            type: Boolean
        },
        is_fake: {
            type: Boolean
        },
        is_ready_to_ship: {
            type: Boolean
        },
        has_gift: {
            type: Boolean
        },
        is_electronic: {
            type: Boolean
        },
        is_roosta: {
            type: Boolean
        },
        warehouse_label: {
            type: String
        },
        is_ad: {
            type: Boolean
        }
    },
    warehouse_stock: {
        type: Number
    },
    price: {
        selling_price: {
            type: Number
        },
        rrp_price: {
            type: Number
        },
        order_limit: {
            type: Number
        },
        is_incredible: {
            type: Boolean
        },
        is_promotion: {
            type: Boolean
        },
        badge: {
            title: {
                type: String
            },
            color: {
                type: String
            },
            icon: {
                type:  Schema.Types.Mixed
            }
        },
        is_digiplus_promotion: {
            type: Boolean
        },
        is_digiplus_early_access: {
            type: Boolean
        },
        is_plus_promotion: {
            type: Boolean
        },
        is_plus_early_access: {
            type: Boolean
        },
        is_application_incredible: {
            type: Boolean
        },
        is_lightening_deal: {
            type: Boolean
        }
    },
    digiplus: {
        services: {
            type: [
                String
            ]
        },
        is_jet_eligible: {
            type: Boolean
        },
        cash_back: {
            type: Number
        },
        is_general_location_jet_eligible: {
            type: Boolean
        }
    },
    product_badge: {
        text: {
            type: String
        },
        text_color: {
            type: String
        },
        icon: {
            type: String
        },
        icon_color: {
            type: String
        }
    }
}))