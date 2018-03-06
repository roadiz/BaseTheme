/*
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * N THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file harddisk-plugins.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'

function HtmlWebpackHarddiskPlugin (options) {
    options = options || {}
    this.outputPath = options.outputPath
}

HtmlWebpackHarddiskPlugin.prototype.apply = function (compiler) {
    if (compiler.hooks) {
        // compiler.hooks.afterPlugins.tap('SriPlugin', this.afterPlugins.bind(this));
    }

    // let self = this
    // Hook into the html-webpack-plugin processing
    compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData) => {
            this.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName)
        })
    })
}

HtmlWebpackHarddiskPlugin.prototype.registerHwpHooks = function registerHwpHooks (writeAssetToDisk, hwpCompilation) {
    if (hwpCompilation.hooks.htmlWebpackPluginAfterEmit) {
        hwpCompilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('SriPlugin', writeAssetToDisk)
    }
}

HtmlWebpackHarddiskPlugin.prototype.thisCompilation = function thisCompilation (compiler, compilation) {
    let writeAssetToDisk = this.writeAssetToDisk.bind(this, compilation)

    this.validateOptions(compilation)

    if (!this.options.enabled) {
        return
    }

    /*
     *  html-webpack support:
     *    Modify the asset tags before webpack injects them for anything with an integrity value.
     */
    if (compiler.hooks) {
        compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', this.registerHwpHooks.bind(this, writeAssetToDisk))
    } else {
        compilation.plugin('html-webpack-plugin-after-emit', writeAssetToDisk)
    }
}

HtmlWebpackHarddiskPlugin.prototype.afterPlugins = function afterPlugins (compiler) {
    if (compiler.hooks) {
        compiler.hooks.thisCompilation.tap('SriPlugin', this.thisCompilation.bind(this, compiler))
    } else {
        compiler.plugin('this-compilation', this.thisCompilation.bind(this, compiler))
    }
}

/**
 * Writes an asset to disk
 */
HtmlWebpackHarddiskPlugin.prototype.writeAssetToDisk = function (compilation, htmlWebpackPluginOptions, webpackHtmlFilename, callback) {
    // Skip if the plugin configuration didn't set `alwaysWriteToDisk` to true
    if (!htmlWebpackPluginOptions.alwaysWriteToDisk) {
        return
    }

    // Prepare the folder
    let fullPath = path.resolve(this.outputPath || compilation.compiler.outputPath, webpackHtmlFilename)
    let directory = path.dirname(fullPath)
    mkdirp(directory, function (err) {
        if (err) {
            return err
        }

        // Write to disk
        fs.writeFile(fullPath, compilation.assets[webpackHtmlFilename].source(), function (err) {
            if (err) {
                return err
            }
        })
    })
}

module.exports = HtmlWebpackHarddiskPlugin
