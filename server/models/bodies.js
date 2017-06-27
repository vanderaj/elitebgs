/*
 * KodeBlox Copyright 2017 Sayak Mukhopadhyay
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http: //www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

module.exports = new Promise((resolve, reject) => {
    let db = require('../db');
    let mongoose = db.mongoose;
    let Schema = mongoose.Schema;

    let body = new Schema({
        id: { type: Number, unique: true },
        created_at: Date,
        updated_at: Date,
        name: String,
        name_lower: { type: String, lowercase: true },
        system_id: { type: Number, ref: 'system.id' },
        group_id: Number,
        group_name: { type: String, lowercase: true },
        type_id: Number,
        type_name: { type: String, lowercase: true },
        distance_to_arrival: Number,
        full_spectral_class: { type: String, lowercase: true },
        spectral_class: { type: String, lowercase: true },
        spectral_sub_class: { type: String, lowercase: true },
        luminosity_class: { type: String, lowercase: true },
        luminosity_sub_class: { type: String, lowercase: true },
        surface_temperature: Number,
        is_main_star: Boolean,
        age: Number,
        solar_masses: Number,
        solar_radius: Number,
        catalogue_gliese_id: { type: String, lowercase: true },
        catalogue_hipp_id: { type: String, lowercase: true },
        catalogue_hd_id: { type: String, lowercase: true },
        volcanism_type_id: Number,
        volcanism_type_name: { type: String, lowercase: true },
        atmosphere_type_id: Number,
        atmosphere_type_name: { type: String, lowercase: true },
        terraforming_state_id: Number,
        terraforming_state_name: { type: String, lowercase: true },
        earth_masses: Number,
        radius: Number,
        gravity: Number,
        surface_pressure: Number,
        orbital_period: Number,
        semi_major_axis: Number,
        orbital_eccentricity: Number,
        orbital_inclination: Number,
        arg_of_periapsis: Number,
        rotational_period: Number,
        is_rotational_period_tidally_locked: Boolean,
        axis_tilt: Number,
        eg_id: Number,
        belt_moon_masses: Number,
        ring_type_id: Number,
        ring_type_name: { type: String, lowercase: true },
        ring_mass: Number,
        ring_inner_radius: Number,
        ring_outer_radius: Number,
        rings: [{
            id: Number,
            created_at: Date,
            updated_at: Date,
            name: String,
            name_lower: { type: String, lowercase: true },
            semi_major_axis: Number,
            ring_type_id: Number,
            ring_type_name: { type: String, lowercase: true },
            ring_mass: Number,
            ring_inner_radius: Number,
            ring_outer_radius: Number
        }],
        atmosphere_composition: [{
            atmosphere_component_id: Number,
            share: Number,
            atmosphere_component_name: { type: String, lowercase: true },
        }],
        solid_composition: [{
            solid_component_id: Number,
            share: Number,
            solid_component_name: { type: String, lowercase: true },
        }],
        materials: [{
            material_id: Number,
            share: Number,
            material_name: { type: String, lowercase: true },
        }],
        is_landable: Boolean
    }, { runSettersOnQuery: true });

    body.pre('save', function (next) {
        this.created_at *= 1000;
        this.updated_at *= 1000;
        this.name_lower = this.name;
        if (this.rings) {
            this.rings.forEach((ring, index, rings) => {
                rings[index].created_at *= 1000;
                rings[index].updated_at *= 1000;
                rings[index].name_lower = ring.name;
            }, this);
        }
        next();
    });

    body.pre('findOneAndUpdate', function (next) {
        this._update.created_at *= 1000;
        this._update.updated_at *= 1000;
        this._update.name_lower = this._update.name;
        if (this._update.rings) {
            this._update.rings.forEach((ring, index, rings) => {
                rings[index].created_at *= 1000;
                rings[index].updated_at *= 1000;
                rings[index].name_lower = ring.name;
            }, this);
        }
        next();
    });

    let model = mongoose.model('body', body);

    resolve(model);
})