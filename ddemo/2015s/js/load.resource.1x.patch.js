for (s in load.resource) {
    if (s == 'words') {
        continue;
    }
    load.resource[s].x /= 2;
    load.resource[s].y /= 2;

    load.resource[s].w /= 2;
    load.resource[s].h /= 2;
}
load.resource['words'].scale *= .5;