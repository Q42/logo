import SwiftUI

public struct Q42: View {
  private let bounds = CGRect(x: 0, y: 0, width: 333, height: 500)
  public init() {}

  private var balloon: some Shape {
    Fit(path: Path("166.6 500 m 214.8 345.7 273 319 316.9 232.9 c 371.2 126.5 282.5 0 166.6 0 c 50.7 0 -37.9 126.5 16.4 232.9 c 60.2 319 118.4 345.7 166.6 500 c h")!, bounds: bounds)
  }

  private var letters: some Shape {
    Fit(path: Path("131.5 243 m 108.8 276.9 l 131.5 276.9 l 131.5 243 l h 90 277.8 m 131.4 219.9 l 150.2 219.9 l 150.2 276.8 l 161.5 276.8 l 161.5 293.2 l 150.2 293.2 l 150.2 309.8 l 131.5 309.8 l 131.5 293.2 l 90 293.2 l 90 277.8 l 175 251.8 m 175 251.8 174.9 249.8 174.9 247.6 c 175.1 231.4 186.9 217.4 207.9 217.4 c 228.1 217.4 240.5 230.8 240.5 246.5 c 240.5 258.2 234.1 267.7 222.9 274.5 c 205.5 285.1 l 202 287.3 199.1 289.8 197.7 293.3 c 241 293.3 l 241 309.9 l 174.2 309.9 l 174.3 294 179.3 281.1 195.5 271.3 c 210.4 262.4 l 218.1 257.8 221.1 253.1 221.1 246.8 c 221.1 240.2 216.5 234.4 207.4 234.4 c 197.8 234.4 193.1 240.9 193.1 249.4 c 193.1 251.1 193.2 251.8 193.2 251.8 c 175 251.8 l h 256.4 175.7 m 237 160.8 l 243.9 148.8 247.9 135 247.9 120.1 c 247.9 75.2 211.5 38.8 166.6 38.8 c 121.7 38.8 85.3 75.2 85.3 120.1 c 85.3 165 121.7 201.4 166.6 201.4 c 187.2 201.4 205.9 193.8 220.2 181.2 c 240 196.4 l 256.4 175.7 l h 166.6 170.3 m 138.9 170.3 116.5 147.9 116.5 120.2 c 116.5 92.5 138.9 70.1 166.6 70.1 c 194.3 70.1 216.7 92.5 216.7 120.2 c 216.7 127.9 215 135.1 211.9 141.6 c 190.8 125.4 l 174.4 146.1 l 194.7 161.7 l 186.7 167.1 177 170.3 166.6 170.3 c h")!, bounds: bounds)
  }

  public var body: some View {
    ZStack {
      balloon.fill()
      letters.blendMode(.destinationOut)
    }
    .compositingGroup()
    .aspectRatio(333 / 500, contentMode: .fit)
    .frame(minWidth: 53, minHeight: 80)
    .frame(idealWidth: 333, idealHeight: 500)
    .accessibilityLabel("Q42 logo")
    .accessibilityAddTraits(.isImage)
  }
}

public extension Color {
  static let q42Green = Color(.displayP3, red: 132/255, green: 188/255, blue: 45/255)
}

private struct Fit: Shape {
  let path: Path
  let bounds: CGRect
  func path(in rect: CGRect) -> Path {
    path.applying(CGAffineTransform(
      scaleX: rect.size.width/bounds.size.width,
      y: rect.size.height/bounds.size.height)
    )
  }
}


struct Q42_Previews: PreviewProvider {
  static var previews: some View {
    Group {
      Q42()
        .foregroundColor(.q42Green)
        .previewDisplayName("Q42 groen")
      Q42()
        .foregroundColor(.white)
        .background(Color.black)
        .previewDisplayName("Wit / Diapositief")
      Q42()
        .previewDisplayName("Zwart")
    }
    .previewLayout(.sizeThatFits)
  }
}
