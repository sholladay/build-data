import test from 'ava';
import buildData from '.';

test('buildData()', async (t) => {
    const data = await buildData();
    t.is(typeof data, 'object');
    t.truthy(data);
    t.is(typeof data.branch, 'string');
    t.truthy(data.branch);
    t.is(typeof data.version, 'string');
    t.truthy(data.version);
    t.true(data.version.length >= '0.0.0'.length);
});

test('buildData() given branch and version', async (t) => {
    const bra = await buildData({ branch : 'foo' });
    t.is(bra.branch, 'foo');
    const ver = await buildData({ version : 'bar' });
    t.is(ver.version, 'bar');
    const opt = {
        branch  : 'wee',
        version : 'woo'
    };
    const both = await buildData(opt);
    t.not(both, opt);
    t.deepEqual(both, opt);
});

test('buildData.latest() given branch and version', async (t) => {
    const opt = {
        branch  : 'wee',
        version : 'woo'
    };
    const both = await buildData.latest(opt);
    t.not(both, opt);
    t.deepEqual(both, opt);
});
