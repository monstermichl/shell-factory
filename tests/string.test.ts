import { expect } from 'chai';
import {
    wrapInQuotes,
    convertToString,
    ConvertToStringError,
} from '../src/helpers/string.mjs';

describe('string tests', () => {
    describe('wrapInQuotes', () => {
        describe('successful', () => {
            it('string without whitespaces', () => {
                const value = 'value';
                expect(wrapInQuotes(value)).to.be.equal(value);
            });

            it('string without whitespaces force', () => {
                const value = 'value';
                expect(wrapInQuotes(value, true)).to.be.equal(`"${value}"`);
            });

            it('string with whitespaces', () => {
                const value = 'value 2';
                expect(wrapInQuotes(value)).to.be.equal(`"${value}"`);
            });

            it('string with whitespaces only with start-quote', () => {
                const value = '"value 2';
                expect(wrapInQuotes(value)).to.be.equal(`"${value}"`);
            });

            it('string with whitespaces only with end-quote', () => {
                const value = 'value 2"';
                expect(wrapInQuotes(value)).to.be.equal(`"${value}"`);
            });
        });

        describe('failed', () => {
            it('variable is not a string', () => {
                expect(function() {
                    wrapInQuotes({} as any);
                }).to.throw('Variable is not a string');
            });
        });
    });

    describe('convertToString', () => {
        describe('successful', () => {
            it('trim', () => {
                const value = ' value  ';
                expect(convertToString(value, undefined, { trim: true })).to.be.equal(value.trim());
            });

            it('don\'t trim', () => {
                const value = ' value  ';
                expect(convertToString(value, undefined, { trim: false })).to.be.equal(value);
            });

            it('undefined', () => {
                expect(convertToString(undefined as any)).to.be.equal('');
            });
        });

        describe('failed', () => {
            it('empty not allowed', () => {
                convertToString('', (e: ConvertToStringError) => {
                    expect(e).to.be.equal(ConvertToStringError.EmptyValue);
                });
            });
        });
    });
});
