import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.path

@Composable
fun rememberQ42Logo(): ImageVector {
    return remember {
        ImageVector.Builder(
            name = "newIcon",
            defaultWidth = 333.2.dp,
            defaultHeight = 500.dp,
            viewportWidth = 333.2f,
            viewportHeight = 500f
        ).apply {
            path(
                fill = SolidColor(Color(0xFF84BC2D)),
                fillAlpha = 1.0f,
                stroke = null,
                strokeAlpha = 1.0f,
                strokeLineWidth = 1.0f,
                strokeLineCap = StrokeCap.Butt,
                strokeLineJoin = StrokeJoin.Miter,
                strokeLineMiter = 1.0f,
                pathFillType = PathFillType.NonZero
            ) {
                moveTo(166.6f, 500f)
                curveTo(214.8f, 345.7f, 273f, 319f, 316.9f, 232.9f)
                curveTo(371.2f, 126.5f, 282.5f, 0f, 166.6f, 0f)
                curveTo(50.7f, 0f, -37.9f, 126.5f, 16.4f, 232.9f)
                curveTo(60.2f, 319f, 118.4f, 345.7f, 166.6f, 500f)
                close()
            }
            path(
                fill = SolidColor(Color(0xFFFFFFFF)),
                fillAlpha = 1.0f,
                stroke = null,
                strokeAlpha = 1.0f,
                strokeLineWidth = 1.0f,
                strokeLineCap = StrokeCap.Butt,
                strokeLineJoin = StrokeJoin.Miter,
                strokeLineMiter = 1.0f,
                pathFillType = PathFillType.NonZero
            ) {
                moveTo(131.5f, 243f)
                lineToRelative(-22.7f, 33.9f)
                horizontalLineToRelative(22.7f)
                verticalLineTo(243f)
                close()
                moveTo(90f, 277.8f)
                lineToRelative(41.4f, -57.9f)
                horizontalLineToRelative(18.8f)
                verticalLineToRelative(56.9f)
                horizontalLineToRelative(11.3f)
                verticalLineToRelative(16.4f)
                horizontalLineToRelative(-11.3f)
                verticalLineToRelative(16.6f)
                horizontalLineToRelative(-18.7f)
                verticalLineToRelative(-16.6f)
                horizontalLineTo(90f)
                verticalLineTo(277.8f)
                close()
            }
            path(
                fill = SolidColor(Color(0xFFFFFFFF)),
                fillAlpha = 1.0f,
                stroke = null,
                strokeAlpha = 1.0f,
                strokeLineWidth = 1.0f,
                strokeLineCap = StrokeCap.Butt,
                strokeLineJoin = StrokeJoin.Miter,
                strokeLineMiter = 1.0f,
                pathFillType = PathFillType.NonZero
            ) {
                moveTo(175f, 251.8f)
                curveToRelative(0f, 0f, -0.1f, -2f, -0.1f, -4.2f)
                curveToRelative(0.2f, -16.2f, 12f, -30.2f, 33f, -30.2f)
                curveToRelative(20.2f, 0f, 32.6f, 13.4f, 32.6f, 29.1f)
                curveToRelative(0f, 11.7f, -6.4f, 21.2f, -17.6f, 28f)
                lineToRelative(-17.4f, 10.6f)
                curveToRelative(-3.5f, 2.2f, -6.4f, 4.7f, -7.8f, 8.2f)
                horizontalLineTo(241f)
                verticalLineToRelative(16.6f)
                horizontalLineToRelative(-66.8f)
                curveToRelative(0.1f, -15.9f, 5.1f, -28.8f, 21.3f, -38.6f)
                lineToRelative(14.9f, -8.9f)
                curveToRelative(7.7f, -4.6f, 10.7f, -9.3f, 10.7f, -15.6f)
                curveToRelative(0f, -6.6f, -4.6f, -12.4f, -13.7f, -12.4f)
                curveToRelative(-9.6f, 0f, -14.3f, 6.5f, -14.3f, 15f)
                curveToRelative(0f, 1.7f, 0.1f, 2.4f, 0.1f, 2.4f)
                horizontalLineTo(175f)
                close()
            }
            path(
                fill = SolidColor(Color(0xFFFFFFFF)),
                fillAlpha = 1.0f,
                stroke = null,
                strokeAlpha = 1.0f,
                strokeLineWidth = 1.0f,
                strokeLineCap = StrokeCap.Butt,
                strokeLineJoin = StrokeJoin.Miter,
                strokeLineMiter = 1.0f,
                pathFillType = PathFillType.NonZero
            ) {
                moveTo(256.4f, 175.7f)
                lineTo(237f, 160.8f)
                curveToRelative(6.9f, -12f, 10.9f, -25.8f, 10.9f, -40.7f)
                curveToRelative(0f, -44.9f, -36.4f, -81.3f, -81.3f, -81.3f)
                reflectiveCurveToRelative(-81.3f, 36.4f, -81.3f, 81.3f)
                curveToRelative(0f, 44.9f, 36.4f, 81.3f, 81.3f, 81.3f)
                curveToRelative(20.6f, 0f, 39.3f, -7.6f, 53.6f, -20.2f)
                lineToRelative(19.8f, 15.2f)
                lineTo(256.4f, 175.7f)
                close()
                moveTo(166.6f, 170.3f)
                curveToRelative(-27.7f, 0f, -50.1f, -22.4f, -50.1f, -50.1f)
                reflectiveCurveToRelative(22.4f, -50.1f, 50.1f, -50.1f)
                reflectiveCurveToRelative(50.1f, 22.4f, 50.1f, 50.1f)
                curveToRelative(0f, 7.7f, -1.7f, 14.9f, -4.8f, 21.4f)
                lineToRelative(-21.1f, -16.2f)
                lineToRelative(-16.4f, 20.7f)
                lineToRelative(20.3f, 15.6f)
                curveTo(186.7f, 167.1f, 177f, 170.3f, 166.6f, 170.3f)
                close()
            }
        }.build()
    }
}
