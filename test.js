import * as THREE from "three";

const arr = [
    {
        "business_id": "1506",
        "Services": [
            {
                "service_name": "istio-ingressgateway",
                "project_level": ""
            },
            {
                "service_name": "virtua",
                "project_level": ""
            },
            {
                "service_name": "saas-fe",
                "project_level": ""
            },
            {
                "service_name": "leopard",
                "project_level": ""
            },
            {
                "service_name": "shelltest",
                "project_level": ""
            },
            {
                "service_name": "gitcustom",
                "project_level": ""
            },
            {
                "service_name": "peer",
                "project_level": ""
            },
            {
                "service_name": "javademods2",
                "project_level": ""
            },
            {
                "service_name": "snail-vite",
                "project_level": ""
            },
            {
                "service_name": "daemonset",
                "project_level": ""
            },
            {
                "service_name": "javademods",
                "project_level": ""
            },
            {
                "service_name": "pusher16",
                "project_level": ""
            },
            {
                "service_name": "kyd-test-s11",
                "project_level": ""
            },
            {
                "service_name": "micro-frontends-log",
                "project_level": ""
            },
            {
                "service_name": "thanos-query",
                "project_level": ""
            },
            {
                "service_name": "golangci-lint",
                "project_level": ""
            },
            {
                "service_name": "island-lyc",
                "project_level": ""
            },
            {
                "service_name": "godzilla",
                "project_level": ""
            },
            {
                "service_name": "business-tabulation",
                "project_level": ""
            },
            {
                "service_name": "test-fp",
                "project_level": ""
            },
            {
                "service_name": "javademo222",
                "project_level": ""
            },
            {
                "service_name": "javademo22",
                "project_level": ""
            },
            {
                "service_name": "pusher3",
                "project_level": ""
            },
            {
                "service_name": "jump",
                "project_level": ""
            },
            {
                "service_name": "push",
                "project_level": ""
            },
            {
                "service_name": "cd-urgent",
                "project_level": ""
            },
            {
                "service_name": "approval-superiors",
                "project_level": ""
            },
            {
                "service_name": "approval-role",
                "project_level": ""
            },
            {
                "service_name": "appproval-personnel",
                "project_level": ""
            },
            {
                "service_name": "approval-department",
                "project_level": ""
            },
            {
                "service_name": "approval-peer",
                "project_level": ""
            },
            {
                "service_name": "gull-tcsl",
                "project_level": ""
            },
            {
                "service_name": "tenant-frontend",
                "project_level": ""
            },
            {
                "service_name": "test11111",
                "project_level": ""
            },
            {
                "service_name": "git",
                "project_level": ""
            },
            {
                "service_name": "shop-business-service-test",
                "project_level": ""
            },
            {
                "service_name": "maven-dependency-risk-checker",
                "project_level": ""
            },
            {
                "service_name": "barnacle",
                "project_level": ""
            },
            {
                "service_name": "tenant-frontend",
                "project_level": ""
            },
            {
                "service_name": "tenant-fontend",
                "project_level": ""
            },
            {
                "service_name": "cd",
                "project_level": ""
            },
            {
                "service_name": "sentry-exporter",
                "project_level": ""
            },
            {
                "service_name": "shark-gateway",
                "project_level": ""
            },
            {
                "service_name": "kelp",
                "project_level": ""
            },
            {
                "service_name": "gzstest",
                "project_level": ""
            },
            {
                "service_name": "upload",
                "project_level": ""
            },
            {
                "service_name": "dispatcher",
                "project_level": ""
            },
            {
                "service_name": "opstools",
                "project_level": ""
            },
            {
                "service_name": "opstools",
                "project_level": ""
            },
            {
                "service_name": "javademo2",
                "project_level": ""
            },
            {
                "service_name": "dns-inward",
                "project_level": ""
            },
            {
                "service_name": "httpbin",
                "project_level": ""
            },
            {
                "service_name": "cancer",
                "project_level": ""
            },
            {
                "service_name": "testgrpc",
                "project_level": ""
            },
            {
                "service_name": "houshoushuai-mvn-cache-test",
                "project_level": ""
            },
            {
                "service_name": "test-23121321",
                "project_level": ""
            },
            {
                "service_name": "test-78-99911",
                "project_level": ""
            },
            {
                "service_name": "test-78-9991rre31321321321",
                "project_level": ""
            },
            {
                "service_name": "test-78-9991rre",
                "project_level": ""
            },
            {
                "service_name": "test-78-9991",
                "project_level": ""
            },
            {
                "service_name": "test-78-8888",
                "project_level": ""
            },
            {
                "service_name": "test-78-99ewqew",
                "project_level": ""
            },
            {
                "service_name": "test-78-9ewq",
                "project_level": ""
            },
            {
                "service_name": "test-78-999",
                "project_level": ""
            },
            {
                "service_name": "test-78-321",
                "project_level": ""
            },
            {
                "service_name": "test-78-456",
                "project_level": ""
            },
            {
                "service_name": "test-78-123",
                "project_level": ""
            },
            {
                "service_name": "test-78-11111",
                "project_level": ""
            },
            {
                "service_name": "test-78-231232ewqewqewq",
                "project_level": ""
            },
            {
                "service_name": "test-78-231232dsads",
                "project_level": ""
            },
            {
                "service_name": "ewqewqewqewq",
                "project_level": ""
            },
            {
                "service_name": "test-78-231232",
                "project_level": ""
            },
            {
                "service_name": "test-78-3",
                "project_level": ""
            },
            {
                "service_name": "devops-dashbaord-migrate",
                "project_level": ""
            },
            {
                "service_name": "api-router-test",
                "project_level": ""
            },
            {
                "service_name": "api-router",
                "project_level": ""
            },
            {
                "service_name": "dotnet",
                "project_level": ""
            },
            {
                "service_name": "moonlite",
                "project_level": ""
            },
            {
                "service_name": "test_test",
                "project_level": ""
            },
            {
                "service_name": "php-test",
                "project_level": ""
            },
            {
                "service_name": "middleware-demo",
                "project_level": ""
            },
            {
                "service_name": "tortoise-test",
                "project_level": ""
            },
            {
                "service_name": "whale-test",
                "project_level": ""
            },
            {
                "service_name": "coredns-hdns",
                "project_level": ""
            },
            {
                "service_name": "houshoushuai-test-build",
                "project_level": ""
            },
            {
                "service_name": "coredns-hdns",
                "project_level": ""
            },
            {
                "service_name": "islands-docs",
                "project_level": ""
            },
            {
                "service_name": "fileman",
                "project_level": ""
            },
            {
                "service_name": "islands-doc",
                "project_level": ""
            },
            {
                "service_name": "sso-web",
                "project_level": ""
            },
            {
                "service_name": "oyster",
                "project_level": ""
            },
            {
                "service_name": "java-ci-build-test",
                "project_level": ""
            },
            {
                "service_name": "crab",
                "project_level": ""
            },
            {
                "service_name": "oyster",
                "project_level": ""
            },
            {
                "service_name": "crab",
                "project_level": ""
            },
            {
                "service_name": "okr-ide",
                "project_level": ""
            },
            {
                "service_name": "service-test-houshoushuai",
                "project_level": ""
            },
            {
                "service_name": "okr-ide",
                "project_level": ""
            },
            {
                "service_name": "test-1-8",
                "project_level": ""
            },
            {
                "service_name": "javademo",
                "project_level": ""
            },
            {
                "service_name": "tide",
                "project_level": ""
            },
            {
                "service_name": "coral",
                "project_level": ""
            },
            {
                "service_name": "krill",
                "project_level": ""
            },
            {
                "service_name": "krill",
                "project_level": ""
            },
            {
                "service_name": "yuanbao-service-base-server",
                "project_level": ""
            },
            {
                "service_name": "javademo",
                "project_level": ""
            },
            {
                "service_name": "octopus",
                "project_level": ""
            },
            {
                "service_name": "otariinae-updatestatus",
                "project_level": ""
            },
            {
                "service_name": "otariinae-updatestatus",
                "project_level": ""
            },
            {
                "service_name": "seahorse",
                "project_level": ""
            },
            {
                "service_name": "gcs",
                "project_level": ""
            },
            {
                "service_name": "devops-platform-ide",
                "project_level": ""
            },
            {
                "service_name": "quality-platform-ide",
                "project_level": ""
            },
            {
                "service_name": "quality-platform-api",
                "project_level": ""
            },
            {
                "service_name": "quality-platform-assist",
                "project_level": ""
            },
            {
                "service_name": "new-onduty",
                "project_level": ""
            },
            {
                "service_name": "coe-ide",
                "project_level": ""
            },
            {
                "service_name": "coe-api",
                "project_level": ""
            },
            {
                "service_name": "terminal",
                "project_level": ""
            },
            {
                "service_name": "seahorse",
                "project_level": ""
            },
            {
                "service_name": "jellyfish",
                "project_level": ""
            },
            {
                "service_name": "argo",
                "project_level": ""
            },
            {
                "service_name": "shark",
                "project_level": ""
            },
            {
                "service_name": "gzs",
                "project_level": ""
            },
            {
                "service_name": "gcs",
                "project_level": ""
            },
            {
                "service_name": "devops-platform-ide",
                "project_level": ""
            },
            {
                "service_name": "quality-platform-ide",
                "project_level": ""
            },
            {
                "service_name": "quality-platform-api",
                "project_level": ""
            },
            {
                "service_name": "quality-platform-assist",
                "project_level": ""
            },
            {
                "service_name": "onduty-api",
                "project_level": ""
            },
            {
                "service_name": "new-onduty",
                "project_level": ""
            },
            {
                "service_name": "coe-ide",
                "project_level": ""
            },
            {
                "service_name": "coe-api",
                "project_level": ""
            },
            {
                "service_name": "getapolloconfig",
                "project_level": ""
            },
            {
                "service_name": "plugins-rolloutcd",
                "project_level": ""
            },
            {
                "service_name": "go-web-example",
                "project_level": ""
            },
            {
                "service_name": "grpc-ingress",
                "project_level": ""
            },
            {
                "service_name": "sso-ide",
                "project_level": ""
            },
            {
                "service_name": "shark-master",
                "project_level": ""
            },
            {
                "service_name": "jellyfish",
                "project_level": ""
            },
            {
                "service_name": "store",
                "project_level": ""
            },
            {
                "service_name": "otariinae",
                "project_level": ""
            },
            {
                "service_name": "islands-mig",
                "project_level": ""
            },
            {
                "service_name": "carp",
                "project_level": ""
            },
            {
                "service_name": "winkles",
                "project_level": ""
            },
            {
                "service_name": "sso",
                "project_level": ""
            },
            {
                "service_name": "carp",
                "project_level": ""
            },
            {
                "service_name": "store",
                "project_level": ""
            },
            {
                "service_name": "otariinae",
                "project_level": ""
            },
            {
                "service_name": "grpcdemo",
                "project_level": ""
            },
            {
                "service_name": "pusher",
                "project_level": ""
            },
            {
                "service_name": "gull",
                "project_level": ""
            },
            {
                "service_name": "hyperspace",
                "project_level": ""
            },
            {
                "service_name": "mendian-gateway-portal",
                "project_level": ""
            },
            {
                "service_name": "starfish",
                "project_level": ""
            },
            {
                "service_name": "islands",
                "project_level": ""
            }
        ]
    },
    {
        "business_id": "1911",
        "Services": [
            {
                "service_name": "lobster-sql-service",
                "project_level": ""
            },
            {
                "service_name": "dolphin-sync",
                "project_level": ""
            },
            {
                "service_name": "shark-plugins",
                "project_level": ""
            },
            {
                "service_name": "chaos-controller-manager",
                "project_level": ""
            },
            {
                "service_name": "chaosd",
                "project_level": ""
            },
            {
                "service_name": "tuna",
                "project_level": ""
            },
            {
                "service_name": "paracaudina",
                "project_level": ""
            },
            {
                "service_name": "golang-demo",
                "project_level": ""
            },
            {
                "service_name": "cuttlebone",
                "project_level": ""
            },
            {
                "service_name": "ocean-helloworld",
                "project_level": ""
            },
            {
                "service_name": "utask",
                "project_level": ""
            },
            {
                "service_name": "go-inception",
                "project_level": ""
            },
            {
                "service_name": "nori",
                "project_level": ""
            },
            {
                "service_name": "java-demo1",
                "project_level": ""
            },
            {
                "service_name": "lyctest",
                "project_level": ""
            },
            {
                "service_name": "orca",
                "project_level": ""
            },
            {
                "service_name": "clownfish-mysql-exporter",
                "project_level": ""
            },
            {
                "service_name": "test1111",
                "project_level": ""
            },
            {
                "service_name": "nginx",
                "project_level": ""
            },
            {
                "service_name": "test-aaaaa",
                "project_level": ""
            },
            {
                "service_name": "busybox",
                "project_level": ""
            },
            {
                "service_name": "lobster-agent",
                "project_level": ""
            },
            {
                "service_name": "walrus",
                "project_level": ""
            },
            {
                "service_name": "lobster-agent",
                "project_level": ""
            },
            {
                "service_name": "clownfish-mongo-exporter",
                "project_level": ""
            },
            {
                "service_name": "clownfish-redis-exporter",
                "project_level": ""
            },
            {
                "service_name": "logging",
                "project_level": ""
            },
            {
                "service_name": "sponge",
                "project_level": ""
            },
            {
                "service_name": "lobster",
                "project_level": ""
            },
            {
                "service_name": "trumpetfish",
                "project_level": ""
            },
            {
                "service_name": "turtles-sync",
                "project_level": ""
            },
            {
                "service_name": "shrimp-op",
                "project_level": ""
            },
            {
                "service_name": "cuttlefish-ldap",
                "project_level": ""
            },
            {
                "service_name": "sardine",
                "project_level": ""
            },
            {
                "service_name": "turtles-api",
                "project_level": ""
            },
            {
                "service_name": "cuttle-org",
                "project_level": ""
            },
            {
                "service_name": "cuttlefish-larva",
                "project_level": ""
            },
            {
                "service_name": "sardine",
                "project_level": ""
            },
            {
                "service_name": "croaker",
                "project_level": ""
            },
            {
                "service_name": "tortoise-for-cuttlefish",
                "project_level": ""
            },
            {
                "service_name": "whale-for-cuttlefish",
                "project_level": ""
            },
            {
                "service_name": "hpa-web",
                "project_level": ""
            },
            {
                "service_name": "turtles",
                "project_level": ""
            },
            {
                "service_name": "conch",
                "project_level": ""
            },
            {
                "service_name": "service-hpa-ci",
                "project_level": ""
            },
            {
                "service_name": "test-git",
                "project_level": ""
            },
            {
                "service_name": "cuttlefish",
                "project_level": ""
            },
            {
                "service_name": "conch",
                "project_level": ""
            },
            {
                "service_name": "catfish",
                "project_level": ""
            },
            {
                "service_name": "onduty",
                "project_level": ""
            },
            {
                "service_name": "driftbottle",
                "project_level": ""
            },
            {
                "service_name": "nacos-sdk-config",
                "project_level": ""
            },
            {
                "service_name": "cloud-service-hpa",
                "project_level": ""
            },
            {
                "service_name": "paramecium",
                "project_level": ""
            },
            {
                "service_name": "middleware-test",
                "project_level": ""
            },
            {
                "service_name": "multi-active-aggregation",
                "project_level": ""
            },
            {
                "service_name": "multi-active-aggregation",
                "project_level": ""
            },
            {
                "service_name": "middleware-control",
                "project_level": ""
            },
            {
                "service_name": "14",
                "project_level": ""
            },
            {
                "service_name": "paramecium",
                "project_level": ""
            },
            {
                "service_name": "gzs",
                "project_level": ""
            },
            {
                "service_name": "shrimp",
                "project_level": ""
            },
            {
                "service_name": "gull-doc",
                "project_level": ""
            },
            {
                "service_name": "gull-doc",
                "project_level": ""
            },
            {
                "service_name": "terminal-controller",
                "project_level": ""
            },
            {
                "service_name": "terminal-controller",
                "project_level": ""
            },
            {
                "service_name": "dispatcher",
                "project_level": ""
            },
            {
                "service_name": "seal",
                "project_level": ""
            },
            {
                "service_name": "seal",
                "project_level": ""
            },
            {
                "service_name": "seabed",
                "project_level": ""
            },
            {
                "service_name": "go-web-example",
                "project_level": ""
            },
            {
                "service_name": "anemone",
                "project_level": ""
            },
            {
                "service_name": "seaweed",
                "project_level": ""
            },
            {
                "service_name": "seaweed",
                "project_level": ""
            },
            {
                "service_name": "terminal",
                "project_level": ""
            },
            {
                "service_name": "service-load-test",
                "project_level": ""
            },
            {
                "service_name": "whale",
                "project_level": ""
            },
            {
                "service_name": "dolphin",
                "project_level": ""
            },
            {
                "service_name": "tortoise",
                "project_level": ""
            }
        ]
    }
]

const res = arr.reduce((prev, curr) => {
    prev.push(...curr.Services)
    return prev
}, [])
console.log(res);






//const planeGeometry = new THREE.PlaneGeometry(1, 1)
//const material = new THREE.MeshBasicMaterial( { color: 0xffff00 })
//const cube = new THREE.Mesh(planeGeometry, material)
//cube.position.set(0, 1, 0)
//cube.rotation.set(-70, 0, 0)
//cube.scale.set(2, 1, 1)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
// 添加材质
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 将立方体和材质融合到一起
const cube = new THREE.Mesh(boxGeometry, material)
scene.add(cube)

//const planeGeometry1 = new THREE.PlaneGeometry(1, 1)
//const material1 = new THREE.MeshStandardMaterial( { color: '#00ffff' })
//const cube1 = new THREE.Mesh(planeGeometry1, material1)
//cube1.position.set(0, 0.5, 0)
//cube1.rotation.set(-70, 0, 0)
//cube1.scale.set(2, 1, 1)
//scene.add(cube1)
//
//const planeGeometry2 = new THREE.PlaneGeometry(1, 1)
//const material2 = new THREE.MeshStandardMaterial( { color: '#00ffff' })
//const cube2 = new THREE.Mesh(planeGeometry2, material2)
//cube2.position.set(0, 0, 0)
//cube2.rotation.set(-70, 0, 0)
//cube2.scale.set(2, 1, 1)
//scene.add(cube2)