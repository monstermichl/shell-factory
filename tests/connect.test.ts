import { expect } from 'chai';
import { isAnyConnectType } from '../src/helpers/connect.mjs';
import { OperationalConnectType } from '../src/interfaces/operationally-connectable.mjs'
import { LogicalConnectType } from '../src/interfaces/logically-connectable.mjs';

describe('connect tests', () => {
    describe('isAnyConnectType', () => {
        describe('successful', () => {
            it('is OperationalConnectType', () => {
                expect(isAnyConnectType(OperationalConnectType.Pipe)).to.be.true;
            });

            it('is LogicalConnectType', () => {
                expect(isAnyConnectType(LogicalConnectType.And)).to.be.true;
            });

            it('is invalid connect-type', () => {
                expect(isAnyConnectType(623)).to.be.false;
            });
        });
    });
});
