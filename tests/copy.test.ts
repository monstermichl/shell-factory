import { deepEqual } from 'assert';
import { expect } from 'chai';
import { copyOver } from '../src/helpers/copy.mjs';

describe('copy tests', () => {
    describe('copy', () => {
        describe('successful', () => {
            it('copy simple object', () => {
                const sourceObject = {
                    property1: 1,
                    property2: 2,
                    property3: 3,
                };
                const targetObject = {};

                copyOver(targetObject, sourceObject);
                expect(targetObject).to.be.deep.equal(sourceObject);
            });

            it('copy nested object', () => {
                const sourceObject = {
                    property1: 1,
                    property2: {
                        property21: 'Hello',
                        property22: 'World',
                    },
                };
                const targetObject = {};

                copyOver(targetObject, sourceObject);
                expect(targetObject).to.be.deep.equal(sourceObject);
            });

            it('copy and overwrite nested object', () => {
                const sourceObject = {
                    property1: 1,
                    property2: {
                        property21: 'Hello',
                        property22: 'World',
                    },
                };
                const targetObject = {
                    property2: 2,
                };

                copyOver(targetObject, sourceObject, true);
                expect(targetObject).to.be.deep.equal(sourceObject);
            });

            it('copy and don\'t overwrite nested object', () => {
                const sourceObject = {
                    property1: 1,
                    property2: {
                        property21: 'Hello',
                        property22: 'World',
                    },
                };
                const targetObject = {
                    property2: 2,
                };

                copyOver(targetObject, sourceObject, false);
                expect(targetObject).to.be.deep.equal({
                    property1: 1,
                    property2: 2,
                });
            });

            it('copy and overwrite even more nested object', () => {
                const sourceObject = {
                    property1: 1,
                    property2: {
                        property21: 'Hello',
                        property22: 'World',
                        property23: {
                            property31: 'What else?',
                        },
                    },
                };
                const targetObject = {
                    property1: 1,
                    property2: {
                        property21: 'Hello',
                        property22: 'World',
                        property23: {
                            property31: 'What else?',
                        },
                    },
                };
                copyOver(targetObject, sourceObject, true);
                expect(targetObject).to.be.deep.equal(sourceObject);
            });

            it('copy simple list', () => {
                const sourceList = [
                    'Hello',
                    'World',
                ];
                const targetList = [] as unknown[];

                copyOver(targetList, sourceList);
                expect(targetList).to.be.deep.equal(sourceList);
            });

            it('copy nested list', () => {
                const sourceList = [
                    'Hello',
                    'World',
                    ['Hello', 'darkness', 'my', 'old', 'friend'],
                ];
                const targetList = [] as unknown[];

                copyOver(targetList, sourceList);
                expect(targetList).to.be.deep.equal(sourceList);
            });

            it('copy list in object', () => {
                const sourceObject = {
                    property1: 'Hello',
                    property2: 'World',
                    property3: [1, 2, 3],
                };
                const targetObject = {};

                copyOver(targetObject, sourceObject);
                expect(targetObject).to.be.deep.equal(sourceObject);
            });

            it('copy object in list', () => {
                const sourceList = [
                    1, 2,
                    {
                        property1: 'Hello',
                        property2: 'World',
                    },
                ];
                const targetList = [] as unknown[];

                copyOver(targetList, sourceList);
                expect(targetList).to.be.deep.equal(sourceList);
            });
        });

        describe('failed', () => {
            it('no source object provided', () => {
                expect(function() {
                    copyOver({}, null as any)
                }).to.throw('No source object provided');
            });

            it('no target object provided', () => {
                expect(function() {
                    copyOver(null as any, {})
                }).to.throw('No target object provided');
            });

            it('source is neither an object nor an array', () => {
                expect(function() {
                    copyOver({}, 1 as any)
                }).to.throw('Source is neither an object nor an array');
            });

            it('target is neither an object nor an array', () => {
                expect(function() {
                    copyOver(1 as any, {})
                }).to.throw('Target is neither an object nor an array');
            });

            it('source and target type do not match', () => {
                expect(function() {
                    copyOver([], {})
                }).to.throw('Source and target type do not match');
            });
        });
    });
});
